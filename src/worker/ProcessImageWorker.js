// src/worker/ProcessImageWorker.js
import { imgBackgroundRemoval } from "../api/Img";

self.onmessage = async (event) => {
    const { taskId, imageFile } = event.data
    try {
        const imgBgRem = await imgBackgroundRemoval(imageFile); 
        
        self.postMessage({ 
            taskId, 
            success: true,
            data: imgBgRem,
        });
    } catch (err) {
        self.postMessage({ 
            taskId, 
            success: false,
            message: err,
        });
    }
};
