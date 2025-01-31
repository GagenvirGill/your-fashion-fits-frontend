import ax from "./axiosConfig";

export const getAllItems = async () => {
    try {
        const response = await ax.get('/item');
        if (response.data.success === true) {
            console.log(response.data.message);
            return response.data.data;
        } else {
            console.error(response.data.message);
            alert(response.data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong when getting items");
    }
};

export const createItem = async (imageFile, description) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('description', description);

        const response = await ax.post('/item', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (response.data.success === true) {
            console.log(response.data.message);
            alert(response.data.message);
            return response.data.data;
        } else {
            console.error(response.data.message);
            alert(response.data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong when creating an item");
    }
};

export const deleteItem = async (itemId) => {
    try {
        const response = await ax.delete('/item', {
            params: {
                "itemId": itemId,
            },
        });
        if (response.data.success === true) {
            console.log(response.data.message);
        } else {
            console.error(response.data.message);
        }
        alert(response.data.message);
    } catch (err) {
        console.error(err);
        alert("Something went wrong when deleting an item");
    }
}

export const filterItemsByCategories = async (categories) => {
    console.log(`it worked, W's in the console, selected categories: ${categories}`)
}

