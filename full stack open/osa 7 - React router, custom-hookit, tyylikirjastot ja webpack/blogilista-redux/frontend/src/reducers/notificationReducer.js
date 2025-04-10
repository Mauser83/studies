import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const setNotification = (message, variant, time) => {
  return (dispatch) => {
    dispatch(showNotification({ message, variant, time }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
