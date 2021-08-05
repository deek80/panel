import React from "react";
import {Button} from "@material-ui/core";
import {useAuth, signIn, signOut, switchUser} from "../firebase";

const menuButton = (text, action) => (
  <Button color="inherit" onClick={action}>
    {text}
  </Button>
);

const LoginButtons = () => {
  const user = useAuth();
  if (user === null) {
    return menuButton("Sign In", signIn);
  }

  return (
    <>
      {menuButton("Switch User", switchUser)}
      {menuButton("Sign Out", signOut)}
    </>
  );
};

export default LoginButtons;
