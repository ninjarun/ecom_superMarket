import React, { useEffect, useState } from 'react';
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
    const cart = useSelector(selecCart);

    const filteredProducts = prods.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        // dispatch(getAllProductsAsync(true));
    }, []);

    return (
        <div style={{ width:'800px' }}>
            <input className="searchBar" placeholder="Search anything at StarStore" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            {searchTerm && (
                <div className="dropContent_search">
                    {filteredProducts.map((product, index) => (
                        <div className='searched_prod' key={index}>
                            <img src={`${SERVER}/static${product.image}`} alt="Product" width="100px" height="100px" />
                            <div className='prod_title_search'>{product.name} {product.price}&#8362;</div>

                            <div className='btn_wrapper'>
                                {cart.cart.find(item => item.id === product.id) ? (
                                    <div className='choose_quantity'>
                                        <div className='decrease_amount_prod_card' onClick={() => dispatch(increment_amount({ 'id': product.id }))}>-</div>
                                        <div className='total_amount'>{cart.cart.find(item => item.id === product.id)?.amount || 0}</div>
                                        <div className='add_amount_prod_card' onClick={() => dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>+</div>
                                    </div>
                                ) : (
                                    <div className='add2cart' onClick={() => dispatch(add2cart({ 'id': product.id, 'title': product.name, 'price': product.price, 'img': product.image, 'amount': 1 }))}>הוסף לסל</div>
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
