interface PendingRequest {
  resolve: (blob: Blob) => void;
  reject: (error: Error) => void;
}

let worker: Worker | null = null;
let messageId = 0;

const pending = new Map<number, PendingRequest>();
let queue: Promise<Blob> = Promise.resolve(new Blob());

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL("./segmentation-worker.ts", import.meta.url));
    
    worker.onmessage = (e: MessageEvent) => {
      const { id, result, error } = e.data;

      const resolver = pending.get(id);
      if (!resolver) {
        return;
      }
      pending.delete(id);

      if (error) {
        resolver.reject(new Error(error));
      } else {
        resolver.resolve(new Blob([result], { type: e.data.type }));
      }
    };
  }
  return worker;
}

async function sendToWorker(file: File): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type });

  return new Promise((resolve, reject) => {
    const id = messageId++;
    pending.set(id, { resolve, reject });
    getWorker().postMessage({ id, file: blob });
  });
}

export function preloadModel(): void {
  getWorker().postMessage({ preload: true });
}

export async function removeBackground(imageFile: File): Promise<File> {
  const task = () => sendToWorker(imageFile);
  queue = queue.then(task, task);
  const blob = await queue;
  return new File([blob], "img.png", { type: blob.type });
}
