import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      const users = action.payload;
      users.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      return users;
    },
    removeUser(state, action) {
      const users = JSON.parse(JSON.stringify(state));
      const updatedUsers = users.map((user) =>
        user.id !== action.payload.id ? user : action.payload
      );
      const sortedUsers = updatedUsers.sort((a, b) => a.name - b.name);
      return sortedUsers;
    },
    findUser(state, action) {
        const users = JSON.parse(JSON.stringify(state))
        const user = users.filter((s) => s.id !== action.payload)
        return user
    }
  },
});

export const { addUser, setUsers, removeUser, findUser } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
