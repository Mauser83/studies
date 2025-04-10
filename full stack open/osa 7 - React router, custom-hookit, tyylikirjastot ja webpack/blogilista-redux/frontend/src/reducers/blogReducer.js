import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      const blogs = action.payload;
      blogs.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
    removeBlog(state, action) {
      const blogs = JSON.parse(JSON.stringify(state));
      return blogs.filter((b) => b.id !== action.payload.id);
    },
    addLike(state, action) {
        const blogs = JSON.parse(JSON.stringify(state));
        const updatedBlogs = blogs.map((b) => (b.id !== action.payload.id ? b : action.payload));
        const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
        return sortedBlogs
    },
    addComment(state, action) {
      const blogs = JSON.parse(JSON.stringify(state))
      const updatedBlogs = blogs.map((b) => (b.id !== action.payload.id ? b : { ...b, comments: action.payload.comments} ))
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
      return sortedBlogs
    }
  },
});

export const { addBlog, setBlogs, removeBlog, addLike, addComment } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blog);
    dispatch(addBlog(addedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(blog.id);
    dispatch(removeBlog(blog));
  };
};

export const likeBlog = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const update = await blogService.update(blog.id, updatedBlog);
    dispatch(addLike(update))
  };
};

export const commentBlog = (blog, comment) => {
  const comm = { comment: comment }
  return async (dispatch) => {
    const update = await blogService.comment(blog.id, comm);
    dispatch(addComment(update))
  }
}

export default blogSlice.reducer;
