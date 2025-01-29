import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5001/category`)
        .then(response => {
            console.log(response.data.data);
            setCategories(response.data.data);
        }).catch(error => {
            setError("Error fetching songs");
            console.error(error);
        });
    }, []);
    
    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} // Show error if it exists
            {categories.map(category => <p key={category.categoryId}>{JSON.stringify(category)}</p>)}
        </div>
    );      
}

export default Test;
