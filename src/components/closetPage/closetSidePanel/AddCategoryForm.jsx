import React, { useState } from "react";

import { createCategory } from "../../../api/Category";

const AddCategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        await createCategory(name, description);
        setLoading(false);

    };

    return (
        <div>
            <p>Create a new Category</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
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
            </form>
            
        </div>
    );
};

export default AddCategoryForm;
