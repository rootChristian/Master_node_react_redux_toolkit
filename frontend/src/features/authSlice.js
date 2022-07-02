import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders } from "./api";

const initialState = {
  data: [],
  user: {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    //isAdmin: false,
    image: "",
  },
  loading: false,
  status: "",
  error: ""
};

//Generates pending, fulfilled and rejected action types
export const registerUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/users/register`, user);

      localStorage.setItem("token", token.data.token);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const users = await axios.get(`${url}/users/${id}`, setHeaders());
      return users.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data.token);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  "user/logout",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/logout`);
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "success";

      const userToken = jwtDecode(state.data.token);
      state.user.firstname = userToken.firstname;
      state.user.lastname = userToken.lastname;
      state.user.email = userToken.email;
      state.user.role = userToken.role;
      //state.user.isAdmin = userToken.isAdmin;
      state.user.image = userToken.image;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.status = "rejected";
      state.error = action.payload;
    });


    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.status = "rejected";
      state.error = action.payload;
    });


    builder.addCase(signIn.pending, state => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "success";

      const userToken = jwtDecode(state.data.token);
      state.user.firstname = userToken.firstname;
      state.user.lastname = userToken.lastname;
      state.user.email = userToken.email;
      state.user.role = userToken.role;
      //state.user.isAdmin = userToken.isAdmin;
      state.user.image = userToken.image;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(signOut.pending, state => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      state.loading = false;
      state.data = [];
      state.status = "success";
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.email = "";
      state.user.role = "";
      //state.user.isAdmin = "";
      state.user.image = "";
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      localStorage.removeItem("token");
      state.data = [];
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.email = "";
      state.user.role = "";
      //state.user.isAdmin = "";
      state.user.image = "";
      state.status = "rejected";
      state.error = action.payload;
    });
  },

});

export default authSlice.reducer;
