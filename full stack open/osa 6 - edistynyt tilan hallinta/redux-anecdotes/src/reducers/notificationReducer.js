import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(showNotification({ message, time }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const { clearNotification, showNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
