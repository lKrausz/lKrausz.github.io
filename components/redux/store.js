import { configureStore, createSlice } from "@reduxjs/toolkit";

const brandsSlice = createSlice({
  name: "brands",
  initialState: { showBrands: [] },
  reducers: {
    setShowBrands: (state, action) => {
      state.showBrands = action.payload;
    },
  },
});
export const { setShowBrands } = brandsSlice.actions;

const languageSlice = createSlice({
  name: 'language',
  initialState: { language: 'en' },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});
export const { changeLanguage } = languageSlice.actions;




const store = configureStore({
  reducer: {
    brands: brandsSlice.reducer,
    language: languageSlice.reducer,
  },
});

export default store;
