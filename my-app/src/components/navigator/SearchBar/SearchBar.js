import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selecProducts } from '../../../slicers/productsSlice';
import { SERVER } from '../../../globalVar';
import './SearchBar.css';
import { useAppDispatch } from '../../../app/hooks';
import { add2cart, increment_amount, selecCart } from '../Cart/cartSlice';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
    const dispatch = useAppDispatch();
    const prods = useSelector(selecProducts);
    const [searchOpen, setSearchOpen] = useState(false);
    const cart = useSelector(selecCart);
    const searchRef = useRef(null);

    const filteredProducts = prods
        .filter(product => product.available === true)
        .filter(product =>
            product.name.toLowerCase().includes(props.searchTerm.toLowerCase())
        );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const clearSearch = () => {
        props.setSearch('');
        setSearchOpen(false);
        props.setSearchBar(!props.searchBar);
    };

    const toggleSearch = () => setSearchOpen(prev => !prev);


    return (
        <div className="searchBarContainer" ref={searchRef}>
            <div className="searchBarWithButton">
                <input
                    className="searchBar"
                    placeholder="חיפוש - מוצר \ מותג \ קטגוריה"
                    value={props.searchTerm}
                    onChange={(e) => props.setSearch(e.target.value)}
                    onClick={toggleSearch}
                />

                {props.searchTerm && (
                    <>
                        {/* Desktop X (right side) */}
                        <button className="clearButton" onClick={clearSearch}>
                            ×
                        </button>

                        {/* Mobile X (centered inside searchBar) */}
                        <button className="clearButtonMobile" onClick={clearSearch}>
                            ×
                        </button>
                    </>
                )}
            </div>

            {searchOpen && props.searchTerm && (
                <div className="dropContent_search">
                    {filteredProducts.map((product, index) => (
                        <div className="searched_prod" key={index}>
                            <Link onClick={clearSearch} to={`product/${product.id}`}>
                                {/* <img
                                    src={`${SERVER}/static${product.image}`}
                                    alt="Product"
                                    width="100px"
                                    height="100px"
                                /> */}
                                <img
                                    src={`${SERVER}/static${product.image}`}
                                    alt="Product"
                                    className="search_prod_img"
                                />

                            </Link>

                            <div className="prod_title_search">{product.name}</div>

                            <div className="btnsWrap">
                                <div className="prod_price_search">
                                    {product.price}&#8362;
                                </div>

                                <div className="btn_wrapper_searchbar">
                                    {cart.cart.find((item) => item.id === product.id) ? (
                                        <div className="choose_quantity_searchbar">
                                            <div
                                                className="decrease_amount_prod_card_searchbar"
                                                onClick={() =>
                                                    dispatch(
                                                        increment_amount({ id: product.id })
                                                    )
                                                }
                                            >
                                                -
                                            </div>
                                            <div className="total_amount_searchbar">
                                                {
                                                    cart.cart.find(
                                                        (item) => item.id === product.id
                                                    )?.amount || 0
                                                }
                                            </div>
                                            <div
                                                className="add_amount_prod_card_searchbar"
                                                onClick={() =>
                                                    dispatch(
                                                        add2cart({
                                                            id: product.id,
                                                            title: product.name,
                                                            price: product.price,
                                                            img: product.image,
                                                            amount: 1,
                                                        })
                                                    )
                                                }
                                            >
                                                +
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="add2cart_searchbar"
                                            onClick={() =>
                                                dispatch(
                                                    add2cart({
                                                        id: product.id,
                                                        title: product.name,
                                                        price: product.price,
                                                        img: product.image,
                                                        amount: 1,
                                                    })
                                                )
                                            }
                                        >
                                            +  <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="22"
                                                height="22"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="9" cy="21" r="1" />
                                                <circle cx="20" cy="21" r="1" />
                                                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                            </svg>
                                        </div>

                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
