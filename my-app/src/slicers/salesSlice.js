import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateTrack, fetchSales } from './salesApi';


const initialState = {
    sales: []
};
export const fetchSalesAsync = createAsyncThunk(
    'sales/fetchSales',
    async (axx) => {
        console.log(axx)
        const sale = { all: "all" }
        const response = await fetchSales(sale,axx);
        return response.data;
    }
);

export const UpdateTrackingAsync = createAsyncThunk(
    'sales/UpdateTracking',
    async (sale) => {
        // const sale ={all:"all"}
        const response = await UpdateTrack(sale);
        return response.data;
    }
);

export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        addany: (state, action) => {
            console.log('meme function')
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(incrementAsync.pending, (state) => {
            //   state.status = 'loading';
            // })
            .addCase(fetchSalesAsync.fulfilled, (state, action) => {
                // console.log(action.payload)
                let tmpAr = action.payload
                // tmpAr.forEach(element => {
                    // element.date_ordered = new Date(element.date_ordered).toLocaleDateString()
                // });
                state.sales = tmpAr
            })

    },
});

export const { addany } = salesSlice.actions;
export const selectSales = (state) => state.sales;
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
// }
// };

export default salesSlice.reducer;
