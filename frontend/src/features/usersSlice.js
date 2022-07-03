import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAxios } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  user: [],
  status: null,
  createStatus: null,
};

//Generates pending, fulfilled and rejected action types
export const usersFetch = createAsyncThunk(
  "users/usersFetch",
  async () => {
    try {
      const response = await authAxios.get(`/users`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const token = await authAxios.post(`/users/register`, user);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response?.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.get(`/users/${_id}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(usersFetch.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(usersFetch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(usersFetch.rejected, (state, action) => {
      state.status = "rejected";
    });


    builder.addCase(getUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "rejected";
    });


    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "success";
      state.createStatus = "success";
      toast.success("User Created!");
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.createStatus = "rejected";
      state.status = "rejected";
      toast.error("rejected!");
    });

  },
});

export default usersSlice.reducer;
