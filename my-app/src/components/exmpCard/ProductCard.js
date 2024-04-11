import React from 'react';
import './ProductCard.css'; // Import CSS file for styling

const ProductCard = () => {
    // Example product data
    const product = {
        name: "iPhone 13 Pro",
        description: "The latest iPhone with advanced features.",
        price: 999.99,
        image: "https://via.placeholder.com/300" // Placeholder image URL
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">${product.price}</div>
                <button className="product-button">Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;
