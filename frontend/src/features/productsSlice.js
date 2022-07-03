import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios, authAxios } from "./api";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    product: [],
    status: null,
    createStatus: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        try {
            const response = await publicAxios.get(`/products`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await publicAxios.get(`/products/${_id}`);
            return response.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerProduct = createAsyncThunk(
    "products/register",
    async (product) => {
        try {
            const response = await authAxios.post(`/products`, product);

            return response.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productsFetch.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(productsFetch.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(productsFetch.rejected, (state, action) => {
            state.status = "rejected";
        });


        builder.addCase(getProduct.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "success";
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.status = "rejected";
        });


        builder.addCase(registerProduct.pending, (state, action) => {
            state.loading = true;
            state.status = "pending";
        });
        builder.addCase(registerProduct.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.status = "success";
            state.createStatus = "success";
            toast.success("Product Created!");
        });
        builder.addCase(registerProduct.rejected, (state, action) => {
            state.createStatus = "rejected";
            state.status = "rejected";
        });

    },
});

export default productsSlice.reducer;
