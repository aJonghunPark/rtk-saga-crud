import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import React from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, usersActions } from "../app/user/usersSlice";

const MyForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(usersActions.setUser({ ...user, [prop]: event.target.value }));
    };
  const handleSubmit = () => {
    if (user.id === "") {
      dispatch(
        usersActions.create({
          name: user.name,
          email: user.email,
          password: user.password,
        })
      );
    } else {
      dispatch(usersActions.update({ ...user }));
    }

    dispatch(
      usersActions.setUser({
        id: "",
        name: "",
        email: "",
        password: "",
      })
    );
  };
  return (
    <>
      <>
        <Input
          style={{ margin: "10px" }}
          margin="none"
          value={user.id}
          fullWidth
          disabled
        />

        <Input
          style={{ margin: "10px" }}
          onChange={handleChange("name")}
          placeholder="Enter Name"
          value={user.name}
          fullWidth
        />
        <Input
          style={{ margin: "10px" }}
          onChange={handleChange("email")}
          placeholder="Enter Email"
          value={user.email}
          fullWidth
        />
        <Input
          style={{ margin: "10px" }}
          onChange={handleChange("password")}
          placeholder="Enter Password"
          value={user.password}
          fullWidth
        />
        <Button
          style={{ margin: "10px" }}
          onClick={() => handleSubmit()}
          fullWidth
          variant="contained"
        >
          Submit
        </Button>
      </>
    </>
  );
};
export default MyForm;
