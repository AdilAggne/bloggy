import { createSlice } from "@reduxjs/toolkit";
import {
  fetchArticles,
  getPaginatedPosts,
  addArticle,
  deleteArticle,
  updateArticle,
} from "../services/PostServices";

const initialState = {
  articles: [],
  id: 0,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(getPaginatedPosts.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(addArticle.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.articles = state.articles.map((article) =>
        article.id === action.payload.id ? action.payload : article
      );
    });
  },
});
