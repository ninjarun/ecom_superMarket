import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './LoginAPI';


const initialState = {
    // items: [] // Renamed from 'sales' to a more generic 'items'
    refreshTok:'',
    accessTok:''
};

export const fetchUserAsync = createAsyncThunk(
    'login/fetchuser',
    async (creds) => { // Added 'params' to make it more dynamic
        console.log('creds',creds)
        const response = await login(creds);
        return response.data;
    }
);

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAsync.fulfilled, (state, action) => {
                // console.log('extra done',action)
                state.refreshTok=action.payload.refresh
                state.accessTok=action.payload.access
            })
    },
});

// Exporting the actions
// export const { addItem } = itemsSlice.actions;

// Selector to access the items
export const selectAccess = (state) => state.login.accessTok; // Update path according to your store structure

// Export the reducer
export default LoginSlice.reducer;
