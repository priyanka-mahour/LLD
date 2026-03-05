import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products', async () => {
    const res = await fetch('https://dummyjson.com/products')
    const jsonRes = await res.json()

    return jsonRes.products
})

interface ProductState {
    items: any[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null
}

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {}, // ← MUST be an object (can be empty)
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })
    }
})

export default productsSlice.reducer
