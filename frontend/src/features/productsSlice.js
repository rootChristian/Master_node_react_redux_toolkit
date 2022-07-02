import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
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
            const response = await axios.get(`${url}/products`);
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
            const response = await axios.get(`${url}/products/${_id}`);
            return response.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);

export const productsCreate = createAsyncThunk(
    "products/productCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/products`,
                values,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
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


        builder.addCase(productsCreate.pending, (state, action) => {
            state.loading = true;
            state.status = "pending";
        });
        builder.addCase(productsCreate.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.status = "success";
            state.createStatus = "success";
            toast.success("Product Created!");
        });
        builder.addCase(productsCreate.rejected, (state, action) => {
            state.createStatus = "rejected";
            state.status = "rejected";
        });

    },
});

export default productsSlice.reducer;
