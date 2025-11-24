import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProduct, fetchProducts, editProduct, fetchOneProduct, fetchCat, removeProduct } from './productsAPI';

const initialState = {
  products: [],
  wishList: JSON.parse(localStorage.getItem('wishList')) || [],
  product: null,
  categories: [],
  status: "idle"
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const fetchOneProductAsync = createAsyncThunk(
  'products/fetchOneProduct',
  async (productID, thunkAPI) => {
    const state = thunkAPI.getState();
    const existingProduct = state.products.products.find(p => p.id === productID);

    // If product exists in the state, return it immediately.
    if (existingProduct) {
      return existingProduct;
    }

    // Otherwise fetch the product.
    console.log('fetching from API', productID)
    const response = await fetchOneProduct(productID);
    return response.data;
  }
);


export const fetchCategoryAsync = createAsyncThunk(
  'products/fetchCatgory',
  async (catID, thunkAPI) => {
    console.log(catID, '%%%%%%%%%%%%%%')
    const state = thunkAPI.getState();
    const existingProduct = state.products.products;

    // If product exists in the state, return it immediately.
    if (existingProduct) {
      console.log('exiting****************')
      return existingProduct;
    }

    // Otherwise fetch the product.
    console.log('fetching from API', catID)
    const response = await fetchCat(catID);
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

export const removeProductAsync = createAsyncThunk(
  'products/removieproduct',
  async (id) => {
    console.log("remove")
    const response = await removeProduct(id);
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
    //     add2wish: (state, action) => {
    //       const tmpWishProd = action.payload;

    //       // Check if the product already exists in the wishList
    //       const existingIndex = state.wishList.findIndex(item => item.id === tmpWishProd.id);

    //       if (existingIndex !== -1) {
    //         // If the product exists, remove it from the wishList
    //         const newWishList = [...state.wishList.slice(0, existingIndex), ...state.wishList.slice(existingIndex + 1)];
    //         console.log('true');
    //         return {
    //           ...state,
    //           wishList: newWishList
    //         };
    //       } else {
    //         // If the product doesn't exist, add it to the wishList
    //         const newWishList = [...state.wishList, tmpWishProd];
    //         console.log('false');
    //         return {
    //           ...state,
    //           wishList: newWishList
    //         };
    //       }
    //       console.log(state.wishList)
    // // };
    //     },
    add2wish: (state, action) => {
      const tmpWishProd = action.payload;

      const existingIndex = state.wishList.findIndex(item => item.id === tmpWishProd.id);

      if (existingIndex !== -1) {
        // Remove from wishlist
        const newWishList = [...state.wishList.slice(0, existingIndex), ...state.wishList.slice(existingIndex + 1)];
        state.wishList = newWishList;
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
      } else {
        // Add to wishlist
        const newWishList = [...state.wishList, tmpWishProd];
        state.wishList = newWishList;
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
      }
    },

  },

  extraReducers: (builder) => {
    builder
      // PENDING
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductAsync.pending, (state) => {
        state.status = 'loading';
      })

      // FULFILLED
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        const tmpProds = [...action.payload];
        // const tmpProds = action.payload.filter(p => p.available === true);
        let filtered = tmpProds.filter(p => p.available === true);

        console.log(filtered)
        const tmpCats = {};
        filtered.forEach(element => {
          if (!tmpCats[element.category]) {
            tmpCats[element.category] = {
              category: element.category,
              products: [],
            };
          }
          tmpCats[element.category].products.push(element);
        });
        state.categories = Object.values(tmpCats);
        state.status = 'idle';
      })
      // src/slicers/productsSlice.js

      .addCase(addProductAsync.fulfilled, (state, action) => {
        console.log('product added');
        alert("מוצר נוסף בהצלחה");
        state.status = 'idle';

        const newProduct = action.payload;

        // 1) push to products list
        state.products.push(newProduct);

        // 2) rebuild categories from products that are available
        const tmpProds = state.products.filter(p => p.available === true);
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

      .addCase(editProductAsync.fulfilled, (state, action) => {
        console.log('product updated');
        alert("מוצר עודכן בהצלחה");
        state.status = 'idle';
      })
    .addCase(removeProductAsync.fulfilled, (state, action) => {
      console.log('product removed', action.meta.arg['id']);
      let deletedid = action.meta.arg['id']
      console.log(deletedid, '************************************')
      // state.products = state.products.filter(product => product.id !== deletedid);
      // fetchProducts()
      alert("מוצר נמחק בהצלחה");
      state.status = 'idle';
    })
    .addCase(fetchOneProductAsync.fulfilled, (state, action) => {
      state.product = action.payload;
      console.log('success', action.payload);
    })
    .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      console.log('success category', action.payload);
    })

    // REJECTED
    .addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to fetch products:', action.error.message);
      alert("שגיאה בעת טעינת מוצרים");
    })
    .addCase(addProductAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to add product:', action.error.message);
      alert("שגיאה בהוספת מוצר");
    })
    .addCase(editProductAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to edit product:', action.error.message);
      alert("שגיאה בעדכון מוצר");
    })
    .addCase(removeProductAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to remove product:', action.error.message);
      alert("שגיאה במחיקת מוצר");
    })
    .addCase(fetchOneProductAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to fetch product:', action.error.message);
      alert("שגיאה בטעינת מוצר");
    })
    .addCase(fetchCategoryAsync.rejected, (state, action) => {
      state.status = 'failed';
      console.error('Failed to fetch category:', action.error.message);
      alert("שגיאה בטעינת קטגוריה");
    });
}

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProductsAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(addProductAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(editProductAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(removeProductAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchProductsAsync.fulfilled, (state, action) => {
  //       state.products = action.payload;
  //       const tmpProds = [...action.payload];
  //       const tmpCats = {};
  //       tmpProds.forEach(element => {
  //         if (!tmpCats[element.category]) {
  //           tmpCats[element.category] = {
  //             category: element.category,
  //             products: [],
  //           };
  //         }
  //         tmpCats[element.category].products.push(element);
  //       });
  //       state.categories = Object.values(tmpCats);
  //       state.status = 'idle'
  //     })
  //     .addCase(addProductAsync.fulfilled, (state, action) => {
  //       // state.products =  action.payload
  //       // console.log(action)
  //       console.log('product added')
  //       alert("מוצר נוסף בהצלחה")
  //       state.status = 'idle'

  //     })
  //     .addCase(editProductAsync.fulfilled, (state, action) => {
  //       // state.products =  action.payload
  //       // console.log(action)
  //       console.log('product updated')
  //       alert("מוצר עודכן בהצלחה")
  //       state.status = 'idle'
  //     })
  //     .addCase(removeProductAsync.fulfilled, (state, action) => {
  //       // state.products =  action.payload
  //       // console.log(action)
  //       console.log('product updated')
  //       alert("מוצר נמחק בהצלחה")
  //       state.status = 'idle'

  //     })
  //     .addCase(fetchOneProductAsync.fulfilled, (state, action) => {
  //       state.product = action.payload
  //       console.log('success', action.payload)
  //     })
  //     .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
  //       state.products = action.payload
  //       console.log('success category', action.payload)
  //     });

  // },
});

export const { setcategories, add2wish } = productsSlice.actions;
export const selecProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectStatus = (state) => state.products.status;
export const selectProduct = (state) => state.products.product;
export const selectWish = (state) => state.products.wishList;

export default productsSlice.reducer;
