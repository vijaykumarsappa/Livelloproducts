import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  selectedCategory: [],
  priceSort: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedCategory.includes(category)) {
        state.selectedCategory = state.selectedCategory.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategory.push(category);
      }
    },
    setPriceSort: (state, action) => {
      state.priceSort = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory } = productSlice.actions;
export default productSlice.reducer;
