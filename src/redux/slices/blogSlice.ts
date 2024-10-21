import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost, BlogState } from "../../types";
import api from "../../utils/api";

const initialState: BlogState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
  const response = await api.get<BlogPost[]>("/posts");
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "blog/addNewPost",
  async (newPost: Omit<BlogPost, "id">) => {
    const response = await api.post<BlogPost>("/posts", newPost);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    sortPostsByDate: (state) => {
      state.posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    filterPostsByTag: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) =>
        post.tags.includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { sortPostsByDate, filterPostsByTag } = blogSlice.actions;
export default blogSlice.reducer;
