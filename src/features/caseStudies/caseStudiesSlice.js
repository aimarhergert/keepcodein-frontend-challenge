import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCaseStudies } from "./caseStudiesApi";

export const fetchCaseStudiesAsync = createAsyncThunk(
  "caseStudies/fetch",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await fetchCaseStudies(signal);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    category: "All",
    query: "",
  },
};

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudiesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCaseStudiesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCaseStudiesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setCategory, setQuery } = caseStudiesSlice.actions;
export default caseStudiesSlice.reducer;
