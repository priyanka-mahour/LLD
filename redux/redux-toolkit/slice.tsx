import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    value: number
}

const initialState: CartState = {
    value: 0
}

const addToCart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state) => {
            state.value+=1
        },
        removeItem: (state) => {
            state.value ? state.value-=1 : null
        },
        clearAllItems: (state) => {
            state.value = 0
        }
    }
})

export const { addItem, removeItem, clearAllItems } = addToCart.actions
export default addToCart.reducer
