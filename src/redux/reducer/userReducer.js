import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getUSerById = createAsyncThunk("users/get/one", async (id) => {
    const response = await axios.get('users/'+ id);
    return response.data;
})

export const getUserCart = createAsyncThunk("user/get/cart", async (id) => {
    const response = await axios.get('carts/user/' + id);
    return response.data;
})


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: { },
        isLoding: true,
        cart:[]
    },
    extraReducers: {
        [getUSerById.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoding = false;
        },
        [getUserCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoding = false;
        },
    }
});

export default userSlice.reducer;
