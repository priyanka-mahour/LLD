import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products', async () => {
    const res = await fetch('https://dummyjson.com/products')
    const jsonRes = await res.json()

    return jsonRes.products
})

const initialState = {
    items: [],
    status: undefined,
    error: null,
}

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded',
            state.items = action.payload,
        });
    },
    reducers: undefined
})

export default productsSlice.reducer
