import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCart } from './cartAPI';

// const initialState = {
//   cart: [],
//   flag:true
// };

const savedCart = localStorage.getItem('cart');
const initialState = savedCart
  ? { cart: JSON.parse(savedCart), flag: true }
  : { cart: [], flag: true };


export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await fetchCart();
    console.log('we are in correct function');
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add2cart: (state, action) => {
      const tmpAr = state.cart
      const tmpProd = action.payload

      if (tmpAr.some(item => item.id === tmpProd.id)) {
        const objectWithId = tmpAr.find(obj => obj.id === tmpProd.id); // Retrieves the object with the matching ID
        objectWithId.amount += 1
      }
      else {
        state.cart = [...state.cart, action.payload]
      }
    },
      increment_amount: (state, action) => {
      const tmpAr = state.cart
      const tmpProd = action.payload

      if (tmpAr.some(item => item.id === tmpProd.id)) {
        const objectWithId = tmpAr.find(obj => obj.id === tmpProd.id); // Retrieves the object with the matching ID
        // if (objectWithId.amount ===0){return}
        if (objectWithId.amount > 0) {
          objectWithId.amount -= 1
        }
        if (objectWithId.amount < 1) {
          state.cart = state.cart.filter(item => item.id !== objectWithId.id)
        }
      }
    },
    remove_prod_from_cart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
    },
    change_amount_prod: (state, action) => {
      // console.log('yup correct')
      // const tmpAr=[...state.cart]
      // const objectWithId = tmpAr.find(obj => obj.id === action.payload.id); // Retrieves the object with the matching import { second } from 'first'
      // objectWithId.amount = action.payload.amount
      // state.cart=tmpAr
      console.log('action',action.payload)
      state.cart = [...action.payload.cart.cart]
      console.log(state.cart)
    },
    // meme:(state,action)=>{
    //   const tmpar=localStorage.getItem('cart');
    //   console.log(tmpar)

    //   state.cart=[...tmpar]
    // }

    meme: (state, action) => {
      const tmpar = JSON.parse(localStorage.getItem('cart') || '[]');
      state.cart = [...tmpar];
    },
    cleanCart:(state,action)=>{
      state.cart=[]
    },
    

  },


  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        console.log('you made it')
        console.log(action)
      });
  },
});

export const { add2cart, increment_amount, remove_prod_from_cart, change_amount_prod ,meme,cleanCart} = cartSlice.actions;
export const selecCart = (state) => state.cart;
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
// }
// };

export default cartSlice.reducer;
