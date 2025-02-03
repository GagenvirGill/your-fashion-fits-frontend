import React, { useState } from "react";

import { createItem } from "../../../api/Item";

const AddItemForm = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImage = async (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);
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
                    onChange={(event) => setDescription(event.target.value)}
                />
                <br />
                <button type="submit" disabled={loading}>Create</button>
                <br />
                {image && (
                    <img 
                        src={URL.createObjectURL(image)} 
                        alt="Preview" 
                        style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                )}
            </form>
            
        </div>
    );
};

export default AddItemForm;
