import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './LoginAPI';


const initialState = {
    refreshTok:'',
    accessTok:'',
    // --- ADDED ---
    loginStatus: 'idle', // 'idle' | 'loading' | 'failed' | 'succeeded'
    loginError: null // To store the error message
    // -------------
};

export const fetchUserAsync = createAsyncThunk(
    'login/fetchuser',
    async (creds, { rejectWithValue }) => {
        console.log('creds',creds)
        try {
            const response = await login(creds);
            return response.data;
        } catch (error) {
            // Use rejectWithValue to pass the error object/message to the rejected action
            return rejectWithValue(error.response?.data?.detail || 'Login failed');
        }
    }
);

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Reducer to clear the error state after it's displayed
        clearLoginStatus: (state) => {
            state.loginStatus = 'idle';
            state.loginError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAsync.pending, (state) => { // ADDED
                state.loginStatus = 'loading';
                state.loginError = null;
            })
            .addCase(fetchUserAsync.fulfilled, (state, action) => {
                state.refreshTok=action.payload.refresh
                state.accessTok=action.payload.access
                state.loginStatus = 'succeeded'; // ADDED
                state.loginError = null;
            })
            .addCase(fetchUserAsync.rejected, (state, action) => { // ADDED
                state.accessTok = ''; // Clear token on failure
                state.loginStatus = 'failed';
                // action.payload contains the value passed to rejectWithValue
                state.loginError = action.payload; 
            })
    },
});

// Exporting the actions
export const { clearLoginStatus } = LoginSlice.actions; // Export the new action

// Selector to access the items
export const selectAccess = (state) => state.login.accessTok;
export const selectLoginStatus = (state) => state.login.loginStatus; // New selector
export const selectLoginError = (state) => state.login.loginError; // New selector

// Export the reducer
export default LoginSlice.reducer;