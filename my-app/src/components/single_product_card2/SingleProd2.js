

import './single_prod2.css';
import { add2cart, increment_amount, selecCart } from '../navigator/Cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SERVER } from '../../globalVar';
import { Link } from 'react-router-dom';
import { add2wish, selectWish } from '../../slicers/productsSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SingleProd2 = ({ prod }) => {
  const dispatch = useAppDispatch();
  const [showAddButton, setShowAddButton] = useState(true);
  const [isWished, setIsWished] = useState(false);
  const cart = useSelector(selecCart);
  const wish = useSelector(selectWish);
  const itemInCart = cart.cart.find(item => item.id === prod.id);
  const itemInWish = wish.find(item => item.id === prod.id);

  useEffect(() => {
    setShowAddButton(!itemInCart);
    setIsWished(!!itemInWish);
  }, [cart, wish, prod.id]);

  const handleAddToCart = () => {
    setShowAddButton(false);
    dispatch(add2cart({ id: prod.id, title: prod.name, price: prod.price, img: prod.image, amount: 1 }));
  };

  const handleWishToggle = () => {
    dispatch(add2wish(prod));
  };

  return (
    <div className="product-card">
      <div className="star-icon" onClick={handleWishToggle}>
        {isWished ? (
          <i className="bi bi-star-fill text-gold"></i>
        ) : (
          <i className="bi bi-star text-gold"></i>
        )}
      </div>

      <Link to={`/product/${prod.id}`} className="product-link">
        <img className="product-image" src={`${SERVER}/static${prod.image}`} alt={prod.name} loading="lazy" />
        <div className="product-name">{prod.name}</div>
        <div className="product-price">&#8362;{prod.price}</div>
      </Link>

      <div className="product-actions">
        {showAddButton ? (
          <button className="btn add-to-cart" onClick={handleAddToCart}>הוסף לסל</button>
        ) : (
          <div className="quantity-control">
            <button
              className="qty-btn"
              onClick={() => {
                if (itemInCart.amount > 1) {
                  dispatch(increment_amount({ id: prod.id }));
                } else {
                  setShowAddButton(true);
                  dispatch(increment_amount({ id: prod.id }));
                }
              }}
            >−</button>
            <div className="qty-count">{itemInCart?.amount ?? 'N/A'}</div>
            <button
              className="qty-btn"
              onClick={() => dispatch(add2cart({ id: prod.id, title: prod.name, price: prod.price, img: prod.image, amount: 1 }))}
            >+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProd2;
