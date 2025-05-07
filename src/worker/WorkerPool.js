// src/worker/WorkerPool.js

class WorkerPool {
	constructor(workerPath, idleTimeout) {
		this.poolSize = Math.max(1, Math.min(navigator.hardwareConcurrency, 3));
		this.numWorkers = 0;
		this.taskQueue = [];
		this.taskIdCounter = 1;
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
		if (this.taskQueue.length === 0) {
			worker.terminate();
			this.numWorkers--;
		} else {
			this.assignTask(worker);
		}
	}

	assignTask(oldWorker) {
		let availWorker;
		if (oldWorker === null) {
			availWorker = this.createNewWorker();
		} else {
			availWorker = oldWorker;
		}

		if (availWorker && this.taskQueue.length > 0) {
			const { taskId, imageFile, resolve, reject } =
				this.taskQueue.shift();
			this.callbacks.set(taskId, { resolve, reject });

			availWorker.postMessage({ taskId, imageFile });
		} else if (availWorker && this.taskQueue.length === 0) {
			availWorker.terminate();
			this.numWorkers--;
		}
	}

	processImage(imageFile) {
		return new Promise((resolve, reject) => {
			const taskId = this.taskIdCounter++;
			this.taskQueue.push({ taskId, imageFile, resolve, reject });
			this.assignTask(null);
		});
	}
}

export const workerPool = new WorkerPool(
	"../worker/ProcessImageWorker.js",
	5000
);
