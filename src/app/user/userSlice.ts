import {
  PayloadAction,
  createAction,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import { User } from "./types";

export interface UserState {
  user: User;
  users: User[];
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
  users: [],
};

const userSlice = createSlice({
  name: "user",
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

export const userActions = {
  create: createAction(`${userSlice.name}/create`, (user: User) => ({
    payload: {
      id: nanoid(),
      name: user.name,
      email: user.email,
      password: user.password,
    },
  })),
  fetchAll: createAction(`${userSlice.name}/fetchAll`),
  fetchAllSucceeded: userSlice.actions.fetchAllSucceeded,
  setUser: userSlice.actions.setUser,
  update: createAction<User>(`${userSlice.name}/update`),
  delete: createAction<User>(`${userSlice.name}/delete`),
};

export const selectUsers = (state: RootState) => state.user.users;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
