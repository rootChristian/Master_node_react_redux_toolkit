import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: null,
    createStatus: null,
};

export const categoriesFetch = createAsyncThunk(
    "categories/categoriesFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/categories`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const categoriesCreate = createAsyncThunk(
    "categories/categoriesCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/categories`,
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

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: {
        [categoriesFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [categoriesFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [categoriesFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [categoriesCreate.pending]: (state, action) => {
            state.createStatus = "pending";
        },
        [categoriesCreate.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.createStatus = "success";
            toast.success("Category Created!");
        },
        [categoriesCreate.rejected]: (state, action) => {
            state.createStatus = "rejected";
        },
    },
});

export default categoriesSlice.reducer;
