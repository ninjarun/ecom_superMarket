import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProduct, fetchProducts, editProduct } from './productsAPI';

const initialState = {
    products: [],
    categories: []
};
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetchProducts();
        return response.data;
    }
);

export const addProductAsync = createAsyncThunk(
    'products/addproduct',
    async (product) => {
        const response = await addProduct(product);
        return response.data;
    }
);

export const editProductAsync = createAsyncThunk(
    'products/editproduct',
    async (product) => {
        console.log("edit")
        const response = await editProduct(product);
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setcategories: (state, action) => {
            return
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(incrementAsync.pending, (state) => {
            //   state.status = 'loading';
            // })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload;
                const tmpProds = [...action.payload];
                const tmpCats = {};
                tmpProds.forEach(element => {
                  if (!tmpCats[element.category]) {
                    tmpCats[element.category] = {
                      category: element.category,
                      products: [],
                    };
                  }
                  tmpCats[element.category].products.push(element);
                });
                state.categories = Object.values(tmpCats);
              })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                // state.products =  action.payload
                // console.log(action)
                console.log('product added')
                alert("מוצר נוסף בהצלחה")
            })
            .addCase(editProductAsync.fulfilled, (state, action) => {
                // state.products =  action.payload
                // console.log(action)
                console.log('product updated')
                alert("מוצר עודכן בהצלחה")

            });

    },
});

export const { setcategories } = productsSlice.actions;
export const selecProducts = (state) => state.products;
export const selectCategories = (state) => state.products.categories;
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
// }
// };

export default productsSlice.reducer;
