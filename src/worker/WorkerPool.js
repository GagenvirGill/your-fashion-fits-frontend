// src/worker/WorkerPool.js

class WorkerPool {
    constructor(workerPath, idleTimeout, termWindow) {
        this.poolSize = Math.max(1, Math.min(navigator.hardwareConcurrency || 2, 8));
        this.workers = [];
        this.taskQueue = [];
        this.taskIdCounter = 0;
        this.callbacks = new Map();
        this.idleTimeout = idleTimeout;
        this.workerPath = new URL(workerPath, import.meta.url);

        for (let i = 0; i < this.poolSize; i++) {
            console.log(`Creating Inital Worker ${i}`);
            this.createWorker();
        }

        this.startTimerCheck(termWindow);
    }

    createWorker() {
        const worker = new Worker(this.workerPath, { type: 'module' });
        worker.onmessage = (event) => {
            this.handleWorkerMessage(worker, event);
        };
        worker.onerror = (error) => console.error('Worker error:', error);

        this.workers.push({
            worker,
            busy: false,
            lastUsed: Date.now(),
        });
    }

    handleWorkerMessage(worker, event) {
        const { taskId, success, data, message } = event.data;
        if (this.callbacks.has(taskId)) {
            const { resolve, reject } = this.callbacks.get(taskId);

            if (success) {
                resolve({ success, data });
            } else {
                reject({ success, message });
            }

            this.callbacks.delete(taskId);
        }
        worker.busy = false;
        worker.lastUsed = Date.now();
        this.assignNextTask();
    }

    assignNextTask() {
        if (this.taskQueue.length === 0) {
            return;
        }

        const availWorker = this.workers.find((wkr) => !wkr.busy);
        if (availWorker) {
            const { taskId, imageFile, resolve, reject } = this.taskQueue.shift();
            this.callbacks.set(taskId, { resolve, reject });

            availWorker.busy = true;
            availWorker.worker.postMessage({ taskId, imageFile });
        }
    }

    processImage(imageFile) {
        return new Promise((resolve, reject) => {
            const taskId = this.taskIdCounter++;
            this.taskQueue.push({ taskId, imageFile, resolve, reject });
            this.assignNextTask();
        });
    }

    terminateIdleWorkers() {
        const currTime = Date.now();
        this.workers.forEach((worker) => {
            if (!worker.busy && (currTime - worker.lastUsed) > this.idleTimeout) {
                console.log("Terminating Idle Worker");
                worker.worker.terminate();
                this.workers = this.workers.filter((wkr) => wkr !== worker);
            }
        });
    }

    createNewWorkers() {
        if (this.taskQueue.length > 0 && this.workers.length < this.poolSize) {
            for (let i = 0; i < Math.min(this.taskQueue.length, this.poolSize - this.workers.length); i++) {
                console.log(`Creating a New Worker`);
                this.createWorker();
                setTimeout(() => this.assignNextTask(), 0);
            }
        }
    }

    startTimerCheck(interval) {
        setInterval(() => {
            this.terminateIdleWorkers()
            this.createNewWorkers()
        }, interval);
    }

    terminate() {
        this.workers.forEach(({ worker }) => {
            worker.terminate();
        });
    }
}

export const workerPool = new WorkerPool("../worker/ProcessImageWorker.js", 5000, 1000)
