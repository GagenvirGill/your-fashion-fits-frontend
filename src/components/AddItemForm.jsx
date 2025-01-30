import React, { useState } from "react";

import { createItem } from "../api/Item";

const AddItemForm = () => {
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImage = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        await createItem(image, description);
        setLoading(false);

    };

    return (
        <div>
            <p>Create a new Closet Item</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image">Image: </label>
                <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    onChange={handleImage}
                    required
                />
                <br />
                <label htmlFor="description">Description: </label>
                <input 
                    type="description" 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit" disabled={loading}>Create</button>
                <br />
                {image && (
                    <img 
                        src={`data:image/png;base64,${image}`} 
                        alt="Preview" 
                        style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                )}
            </form>
            
        </div>
    );
};

export default AddItemForm;
