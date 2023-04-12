import {
  PayloadAction,
  createAction,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import { User } from "./types";

export interface UsersState {
  user: User;
  users: User[];
}

const initialState: UsersState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchAllSucceeded: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const usersActions = {
  create: createAction(`${usersSlice.name}/create`, (user: User) => ({
    payload: {
      id: nanoid(),
      name: user.name,
      email: user.email,
      password: user.password,
    },
  })),
  fetchAll: createAction(`${usersSlice.name}/fetchAll`),
  fetchAllSucceeded: usersSlice.actions.fetchAllSucceeded,
  setUser: usersSlice.actions.setUser,
  update: createAction<User>(`${usersSlice.name}/update`),
  delete: createAction<User>(`${usersSlice.name}/delete`),
};

export const selectUsers = (state: RootState) => state.users.users;
export const selectUser = (state: RootState) => state.users.user;
export default usersSlice.reducer;
