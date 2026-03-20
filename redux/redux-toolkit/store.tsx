import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slice'
import productsSlice from './product-slice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
