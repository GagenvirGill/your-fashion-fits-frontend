// api/WorkerPool.js

class WorkerPool {
    constructor(workerPath, poolSize) {
        this.workers = [];
        this.taskQueue = [];
        this.taskIdCounter = 0;
        this.callbacks = new Map();

        for (let i = 0; i < poolSize; i++) {
            const worker = new Worker(workerPath, { type: 'module' });
            worker.onmessage = (event) => {
                this.handleWorkerMessage(worker, event);
            };
            worker.onerror = (error) => console.error('Worker error:', error);

            this.workers.push({
                worker,
                busy: false,
            });
        }
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
        this.assignNextTask();
    }

    assignNextTask() {
        if (this.taskQueue.length === 0) {
            return;
        }

        const availWorker = this.workers.find((wkr) => !wkr.busy);
        if (!availWorker) {
            return;
        }

        const { taskId, imageFile, resolve, reject } = this.taskQueue.shift();
        this.callbacks.set(taskId, { resolve, reject });
        availWorker.busy = true;
        availWorker.worker.postMessage({ taskId, imageFile });
    }

    processImage(imageFile) {
        return new Promise((resolve, reject) => {
            const taskId = this.taskIdCounter++;
            this.taskQueue.push({ taskId, imageFile, resolve, reject });
            this.assignNextTask();
        });
    }

    terminate() {
        this.workers.forEach(({ worker }) => {
            worker.terminate();
        });
    }
}

export const workerPool = new WorkerPool("/worker/ProcessImageWorker.js", 4)
