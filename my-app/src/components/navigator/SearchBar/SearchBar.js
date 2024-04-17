import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selecProducts } from '../../../slicers/productsSlice';
import { SERVER } from '../../../globalVar';
import './SearchBar.css';
import { useAppDispatch } from '../../../app/hooks';
import { add2cart, increment_amount, selecCart } from '../Cart/cartSlice';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const prods = useSelector(selecProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const cart = useSelector(selecCart);
    const searchRef = useRef(null);

    const filteredProducts = prods.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchOpen(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSearchOpen(false);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <div className="searchBarContainer">
            <div className="searchBarWithButton">
                <input
                    className="searchBar"
                    placeholder="חיפוש - מוצר \ מותג \ קטגוריה"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={toggleSearch}
                />
                {searchTerm && (
                    <button className="clearButton" onClick={clearSearch}>X</button>
                )}
            </div>
            {searchOpen && searchTerm && (
                <div className="dropContent_search" ref={searchRef}>
                    {filteredProducts.map((product, index) => (
                        <div className='searched_prod' key={index}>
                            <img src={`${SERVER}/static${product.image}`} alt="Product" width="100px" height="100px" />
                            <div className='prod_title_search'>{product.name}</div>
                            <div className='prod_price_search'> {product.price}&#8362;</div>
                            <div className='btn_wrapper_searchbar'>
                                {cart.cart.find(item => item.id === product.id) ? (
                                    <div className='choose_quantity_searchbar'>
                                        <div className='decrease_amount_prod_card_searchbar' onClick={() => dispatch(increment_amount({ 'id': product.id }))}>-</div>
                                        <div className='total_amount_searchbar'>{cart.cart.find(item => item.id === product.id)?.amount || 0}</div>
                                        <div className='add_amount_prod_card_searchbar' onClick={() => dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>+</div>
                                    </div>
                                ) : (
                                    <div className='add2cart_searchbar' onClick={() => dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>הוסף לסל</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
