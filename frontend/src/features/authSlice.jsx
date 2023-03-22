import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const eliteUser = JSON.parse(localStorage.getItem("eliteuser"));

const initialState = {
  user: eliteUser ? eliteUser : null,
  userProperty: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error);
    const msg = error.response.data.message;
    return thunkAPI.rejectWithValue(msg);
  }
});

export const getMyProperties = createAsyncThunk(
  "auth/getMyProperty",
  async (thunkAPI) => {
    try {
      return await authService.getMyProperty();
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const deleteMyProperty = createAsyncThunk(
  "auth/deleteMyProperty",
  async (propertyId, thunkAPI) => {
    try {
      return await authService.deleteProperty(propertyId);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(getMyProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProperty = action.payload;
      })
      .addCase(getMyProperties.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.userProperty = null;
      })
      .addCase(deleteMyProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMyProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProperty = action.payload;
      })
      .addCase(deleteMyProperty.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
