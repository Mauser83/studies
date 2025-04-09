import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login"
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(logout());
  };
};

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  };
};

export const logIn = (username, password) => {
    return async (dispatch) => {
        try {
          const user = await loginService.login({
            username,
            password,
          });
          window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
          blogService.setToken(user.token);
          dispatch(login(user))
        } catch (exception) {
          dispatch(setNotification(`wrong username or password`, "danger", 5));
        }
    }}