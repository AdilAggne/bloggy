import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  "article/fetchArticles",
  async () => {
    // Note the use of the "rejectWithValue" callback
    try {
      let res = await fetch("https://localhost:7068/BlogPosts");
      // console.log("response from res: ", res);
      res = await res.json();
      return res;
    } catch (error) {
      console.log("error in fetchArticles");
      // throw error;
    }
  }
);

// Error handling: https://hackernoon.com/api-error-handling-in-react

export const addArticle = createAsyncThunk(
  "article/addArticle",
  async (newArticle) => {
    const response = await fetch("https://localhost:7068/BlogPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    });
    const data = await response.json();
    return data; // Return the newly added article object for updating the state
  }
);

export const getPost = async (id) => {
  let res = await fetch(`https://localhost:7068/BlogPosts/${id}`);
  res = await res.json();
  return res;
};

export const getPostsCount = async () => {
  try {
    let res = await fetch(`https://localhost:7068/BlogPosts/Count`);
    res = await res.json();
    return res;
  } catch (error) {
    console.log("error in getPostsCount");
  }
};

export const getPaginatedPosts = createAsyncThunk(
  "article/getPaginatedPosts",
  async (options) => {
    try {
      let res = await fetch(
        `https://localhost:7068/BlogPosts/paginated?page=${options.page}&pageSize=${options.perPage}`
      );
      res = await res.json();
      return res;
    } catch (error) {
      console.log("error at getPaginatedPosts");
      // throw error;
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (updatedArticle) => {
    const response = await fetch(
      `https://localhost:7068/BlogPosts/${updatedArticle.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      }
    );
    const data = await response.json();
    return data; // Return the updated article object for updating the state
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (articleId) => {
    await fetch(`https://localhost:7068/BlogPosts/${articleId.id}`, {
      method: "DELETE",
    });
    return articleId; // Return the ID of the deleted article for updating the state
  }
);
