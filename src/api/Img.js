import { removeBackground } from "@imgly/background-removal";

export const imgBackgroundRemoval = async (imgPath) => {
    try {
        const blob = await removeBackground(imgPath);
        const file = new File([blob], 'img.jpg', { type: 'image/jpeg' });
        return file;
    } catch (err) {
        console.log(`Error removing background: ${err}`);
        throw err;
    }
};
