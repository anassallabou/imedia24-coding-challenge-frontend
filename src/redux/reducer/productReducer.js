import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllProducts = createAsyncThunk("products/get/all", async () => {
    const response = await axios.get('products/' /*, {
        params: {
            pageSize: param.size,
            pageNo: param.page - 1
        }
    }*/
   );

    return response.data;
})

export const getProductById = createAsyncThunk("products/get/all", async (id) => {
    const response = await axios.get('products/' + id);
    return response.data;
})


export const productsSlice = createSlice({
    name: 'product',
    initialState: {
        product: {
            id: null,
            title: "",
            price: null,
            description: "",
            image:""
        },
        isLoding: true,
        products: []
    },
    extraReducers: {
        [getProductById.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.isLoding = false;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.isLoding = false;
        },
    }
});

export default productsSlice.reducer;
