import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios, authAxios } from "./api";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: null,
    createStatus: null,
};

export const carouselsFetch = createAsyncThunk(
    "carousels/carouselsFetch",
    async () => {
        try {
            const response = await publicAxios.get(`/carousels`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const carouselsCreate = createAsyncThunk(
    "carousels/carouselsCreate",
    async (values) => {
        try {
            const response = await authAxios.post(`/carousels`, values);

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

const carouselsSlice = createSlice({
    name: "carousels",
    initialState,
    reducers: {},
    extraReducers: {
        [carouselsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [carouselsFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [carouselsFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [carouselsCreate.pending]: (state, action) => {
            state.createStatus = "pending";
        },
        [carouselsCreate.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.createStatus = "success";
            toast.success("Product Created!");
        },
        [carouselsCreate.rejected]: (state, action) => {
            state.createStatus = "rejected";
        },
    },
});

export default carouselsSlice.reducer;
