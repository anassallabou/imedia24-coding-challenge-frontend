import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCartByUserId = createAsyncThunk("cart/get/id", async (id) => {
    const response = await axios.get('carts/user/'+ id);
    return response.data;
})

export const getCartById = createAsyncThunk("user/get/cart", async (id) => {
    const response = await axios.get('carts/' + id);
    return response.data;
})


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            id:null,
            userId: null,
            date : null,
            products: [],
            __v: null
        },
        isLoding: true,
        cartByUser:[]
    },
    extraReducers: {
        [getCartById.fulfilled]: (state, action) => {
            state.cart = action.payload;
            state.isLoding = false;
        },
        [getCartByUserId.fulfilled]: (state, action) => {
            state.cartByUser = action.payload;
            state.isLoding = false;
        },
    }
});

export default cartSlice.reducer;
