import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

const initialState = {
  property: null,
  similarProperty: null,
  coordinates: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const createProperty = createAsyncThunk(
  "property/create",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await propertyService.createProperty(data);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getAllProperties = createAsyncThunk(
  "property/getAll",
  async (thunkAPI) => {
    try {
      return await propertyService.getAll();
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getSimilarProperty = createAsyncThunk(
  "property/getSimilar",
  async (type, thunkAPI) => {
    try {
      return await propertyService.getSimilar(type);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getFilteredProperties = createAsyncThunk(
  "property/getByFilter",
  async (url, thunkAPI) => {
    try {
      return await propertyService.getByFilter(url);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getSingleProperty = createAsyncThunk(
  "property/getSingle",
  async (id, thunkAPI) => {
    try {
      return await propertyService.getSingle(id);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getPropertyLocation = createAsyncThunk(
  "property/getLocation",
  async (location, thunkAPI) => {
    try {
      return await propertyService.getLocation(location);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const propertySlice = createSlice({
  name: "property",
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
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
      })
      .addCase(getAllProperties.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.property = null;
      })
      .addCase(getFilteredProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
      })
      .addCase(getFilteredProperties.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.property = null;
      })
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createProperty.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.property = null;
      })
      .addCase(getSingleProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
      })
      .addCase(getSingleProperty.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.property = null;
      })
      .addCase(getPropertyLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPropertyLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coordinates = action.payload;
      })
      .addCase(getPropertyLocation.rejected, (state) => {
        state.isLoading = false;
        state.coordinates = null;
      })
      .addCase(getSimilarProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSimilarProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.similarProperty = action.payload;
      })
      .addCase(getSimilarProperty.rejected, (state) => {
        state.isLoading = false;
        state.similarProperty = null;
      });
  },
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;
