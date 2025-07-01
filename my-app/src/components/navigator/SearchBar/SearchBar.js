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
    // const [props.searchTerm, setSearchTerm] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const cart = useSelector(selecCart);
    const searchRef = useRef(null);

    // const filteredProducts = prods.filter(product =>
    //     product.name.toLowerCase().includes(props.searchTerm.toLowerCase()));
    const filteredProducts = prods
    .filter(product => product.available === true)
    .filter(product => product.name.toLowerCase().includes(props.searchTerm.toLowerCase()));


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
        props.setSearch("");
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
                    value={props.searchTerm}
                    onChange={(e) => props.setSearch(e.target.value)}
                    onClick={toggleSearch}
                />
                {props.searchTerm && (
                    <div>
                    <button className="clearButton" onClick={clearSearch}>X</button>
                    
                    </div>
                )}
            </div>
            {searchOpen && props.searchTerm && (
                <div className="dropContent_search" ref={searchRef}>
                    {filteredProducts.map((product, index) => (
                        //           <Link to={`/product/${props.prod.id}`}>

                       <div className='searched_prod' key={index}>
                           <Link onClick={()=>clearSearch()} to= {`product/${product.id}`}>
                            <img src={`${SERVER}/static${product.image}`} alt="Product" width="100px" height="100px" />
                                </Link>
                            <div className='prod_title_search'>{product.name}</div>
<div className='btnsWrap'>
                            <div className='prod_price_search'> {product.price}&#8362;</div>
                            <div className='btn_wrapper_searchbar'>
                                {cart.cart.find(item => item.id === product.id) ? (
                                    <div className='choose_quantity_searchbar'>
                                        <div className='decrease_amount_prod_card_searchbar' onClick={() => dispatch(increment_amount({ 'id': product.id }))}>-</div>
                                        <div className='total_amount_searchbar'>{cart.cart.find(item => item.id === product.id)?.amount || 0}</div>
                                        <div className='add_amount_prod_card_searchbar' onClick={() => dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>+</div>
                                    </div>
                                ) : (
                                    <div className='add2cart_searchbar' onClick={() => 
                                                     dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>
                                        הוסף לסל
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












// import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { selecProducts } from '../../../slicers/productsSlice';
// import { SERVER } from '../../../globalVar';
// import './SearchBar.css';
// import { useAppDispatch } from '../../../app/hooks';
// import { add2cart, increment_amount, selecCart } from '../Cart/cartSlice';
// import debounce from 'lodash.debounce';

// const SearchBar = ({ searchTerm, setSearch }) => {
//     const dispatch = useAppDispatch();
//     const products = useSelector(selecProducts);
//     const cart = useSelector(selecCart);
//     const [searchOpen, setSearchOpen] = useState(false);
//     const searchRef = useRef(null);

//     const handleClickOutside = useCallback((event) => {
//         if (searchRef.current && !searchRef.current.contains(event.target)) {
//             setSearchOpen(false);
//         }
//     }, []);

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [handleClickOutside]);

//     const handleInputChange = useMemo(() => debounce((value) => {
//         setSearch(value);
//     }, 200), [setSearch]);

//     const onInputChange = (e) => {
//         handleInputChange(e.target.value);
//         if (!searchOpen) setSearchOpen(true);
//     };

//     const clearSearch = () => {
//         setSearch('');
//         setSearchOpen(false);
//     };

//     const filteredProducts = useMemo(() => {
//         const term = searchTerm.toLowerCase();
//         return products.filter(p =>
//             p.available &&
//             p.name.toLowerCase().includes(term)
//         );
//     }, [products, searchTerm]);

//     const addToCartHandler = useCallback((product) => {
//         dispatch(add2cart({ id: product.id, title: product.name, price: product.price, img: product.image, amount: 1 }));
//     }, [dispatch]);

//     const incrementHandler = useCallback((id) => {
//         dispatch(increment_amount({ id }));
//     }, [dispatch]);

//     const renderProduct = (product) => {
//         const inCart = cart.cart.find(item => item.id === product.id);
//         const amount = inCart?.amount || 0;

//         return (
//             <div className='searched_prod' key={product.id}>
//                 <img src={`${SERVER}/static${product.image}`} alt={product.name} width="100" height="100" />
//                 <div className='prod_title_search'>{product.name}</div>
//                 <div className='prod_price_search'>{product.price}&#8362;</div>
//                 <div className='btn_wrapper_searchbar'>
//                     {inCart ? (
//                         <div className='choose_quantity_searchbar'>
//                             <div className='decrease_amount_prod_card_searchbar' onClick={() => incrementHandler(product.id)}>-</div>
//                             <div className='total_amount_searchbar'>{amount}</div>
//                             <div className='add_amount_prod_card_searchbar' onClick={() => addToCartHandler(product)}>+</div>
//                         </div>
//                     ) : (
//                         <div className='add2cart_searchbar' onClick={() => addToCartHandler(product)}>הוסף לסל</div>
//                     )}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="searchBarContainer">
//             <div className="searchBarWithButton">
//                 <input
//                     className="searchBar"
//                     placeholder="חיפוש - מוצר \ מותג \ קטגוריה"
//                     defaultValue={searchTerm}
//                     onChange={onInputChange}
//                     onClick={() => setSearchOpen(true)}
//                 />
//                 {searchTerm && (
//                     <button className="clearButton" onClick={clearSearch}>X</button>
//                 )}
//             </div>

//             {searchOpen && searchTerm && (
//                 <div className="dropContent_search" ref={searchRef}>
//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.map(renderProduct)
//                     ) : (
//                         <div className="no-results">לא נמצאו תוצאות</div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SearchBar;
