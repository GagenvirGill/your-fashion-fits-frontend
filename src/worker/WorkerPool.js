// src/worker/WorkerPool.js

class WorkerPool {
	constructor(workerPath, idleTimeout) {
		this.poolSize = 2;
		// this.poolSize = Math.max(
		// 	1,
		// 	Math.min(navigator.hardwareConcurrency || 2, 8)
		// );
		this.numWorkers = 0;
		this.taskQueue = [];
		this.taskIdCounter = 0;
		this.callbacks = new Map();
		this.idleTimeout = idleTimeout;
		this.workerPath = new URL(workerPath, import.meta.url);
	}

	createNewWorker() {
		if (this.numWorkers < this.poolSize) {
			const worker = new Worker(this.workerPath, { type: "module" });
			this.numWorkers++;

			worker.onmessage = (event) =>
				this.handleWorkerMessage(worker, event);
			worker.onerror = (error) => console.error("Worker error:", error);

			return worker;
		} else {
			return null;
		}
	}

	handleWorkerMessage(worker, event) {
		const { taskId, success, data, message } = event.data;
		const callback = this.callbacks.get(taskId);

		if (callback) {
			const { resolve, reject } = this.callbacks.get(taskId);
			if (success) {
				resolve({ success, data });
			} else {
				reject({ success, message });
			}
			this.callbacks.delete(taskId);
		}

		console.log("Worker Task Completed Assigning New Task");
		this.assignTask(worker);
	}

	assignTask(oldWorker) {
		let availWorker;
		if (oldWorker === null) {
			console.log("Creating New Worker for Task");
			availWorker = this.createNewWorker();
		} else {
			console.log("Using Old Worker for Task");
			availWorker = oldWorker;
		}

		if (availWorker && this.taskQueue.length > 0) {
			console.log("Assigning Worker a Task");
			const { taskId, imageFile, resolve, reject } =
				this.taskQueue.shift();
			this.callbacks.set(taskId, { resolve, reject });

			availWorker.postMessage({ taskId, imageFile });
		} else if (availWorker && this.taskQueue.length === 0) {
			console.log("No Task in the Queue, Terminating Worker");
			availWorker.terminate();
			this.numWorkers--;
			if (this.numWorkers === 0) {
				console.log("All Workers Terminated");
			}
		} else if (availWorker === null && this.taskQueue.length > 0) {
			setTimeout(() => this.assignTask(null), 1000);
		}
	}

	processImage(imageFile) {
		return new Promise((resolve, reject) => {
			const taskId = this.taskIdCounter++;
			console.log(`Task ${taskId} added to the queue`);
			this.taskQueue.push({ taskId, imageFile, resolve, reject });
			this.assignTask(null);
		});
	}
}

export const workerPool = new WorkerPool(
	"../worker/ProcessImageWorker.js",
	5000
);
