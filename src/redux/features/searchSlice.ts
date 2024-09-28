import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    category: null, 
  };
  
  const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      updateSearchQuery: (state, action) => {
        state.query = action.payload;
      },
      updateSelectedOption: (state, action) => {
        state.category = action.payload;
      },
    },
  });
  
  export const { updateSearchQuery, updateSelectedOption } = searchSlice.actions;
  export default searchSlice.reducer;
  