import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: null,
    },
    reducers: {
        setProductData: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setProductData } = productsSlice.actions;
export default productsSlice.reducer;
