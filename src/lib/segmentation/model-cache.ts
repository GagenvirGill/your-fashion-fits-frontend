const DB_NAME = "dis-model-cache";
const STORE_NAME = "models";
const MODEL_KEY = "dis-isnet";
const MODEL_URL =
  "https://huggingface.co/onnx-community/ISNet-ONNX/resolve/main/onnx/model_fp16.onnx";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getFromDB(db: IDBDatabase): Promise<ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(MODEL_KEY);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

function putInDB(db: IDBDatabase, buffer: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const request = tx.objectStore(STORE_NAME).put(buffer, MODEL_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function fetchModel(): Promise<ArrayBuffer> {
  const db = await openDB();
  const cached = await getFromDB(db);
  if (cached) {
    return cached;
  }

  const response = await fetch(MODEL_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch model: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  await putInDB(db, buffer);
  return buffer;
}
