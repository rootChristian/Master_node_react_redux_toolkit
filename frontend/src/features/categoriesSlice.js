import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios, authAxios } from "./api";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    category: [],
    status: null,
    createStatus: null,
};

export const categoriesFetch = createAsyncThunk(
    "categories/categoriesFetch",
    async () => {
        try {
            const response = await publicAxios.get(`/categories`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const registerCategory = createAsyncThunk(
    "categories/register",
    async (category) => {
        try {
            const response = await authAxios.post(`/categories`, category);

            return response.data;
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response?.data);
        }
    }
);

export const getCategory = createAsyncThunk(
    "categories/getCategory",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await authAxios.get(`/categories/${_id}`);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(categoriesFetch.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(categoriesFetch.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(categoriesFetch.rejected, (state, action) => {
            state.status = "rejected";
        });


        builder.addCase(getCategory.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            state.status = "success";
        });
        builder.addCase(getCategory.rejected, (state, action) => {
            state.status = "rejected";
        });


        builder.addCase(registerCategory.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(registerCategory.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.status = "success";
            state.createStatus = "success";
            toast.success("Category Created!");
        });
        builder.addCase(registerCategory.rejected, (state, action) => {
            state.createStatus = "rejected";
            state.status = "rejected";
            toast.error("rejected!");
        });
    },
});

export default categoriesSlice.reducer;
