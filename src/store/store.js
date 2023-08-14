import { configureStore } from "@reduxjs/toolkit";
import { articleSlice } from "./reducer";

export const store = configureStore({
    reducer: articleSlice.reducer
})
