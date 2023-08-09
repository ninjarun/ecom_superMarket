import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../components/navigator/Cart/cartSlice';
import productsReducer from '../slicers/productsSlice';
import salesReducer from '../slicers/salesSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products:productsReducer,
    sales:salesReducer
  },
});
