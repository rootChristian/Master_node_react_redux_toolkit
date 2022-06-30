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
    isAdmin: false,
    image: null,
  },
  loading: false,
  status: "",
  error: ""
};

//Generates pending, fulfilled and rejected action types
export const registerUser = createAsyncThunk(
  "user/register",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/users`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        gender: values.gender,
        image: values.image,
      });

      localStorage.setItem("token", token.data.token);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
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
      state.user.isAdmin = userToken.isAdmin;
      state.user.image = userToken.image;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
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
      state.user.isAdmin = userToken.isAdmin;
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
      state.user.isAdmin = "";
      state.user.image = "";
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      localStorage.removeItem("token");
      state.data = [];
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.email = "";
      state.user.isAdmin = "";
      state.user.image = "";
      state.status = "rejected";
      state.error = action.payload;
    });
  },

});

export default authSlice.reducer;

/*export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;*/