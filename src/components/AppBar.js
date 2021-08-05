import React from "react";
import {AppBar, Toolbar, Typography, makeStyles} from "@material-ui/core";
import LoginButtons from "./LoginButtons";
import {useAuth} from "../firebase";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Bar = () => {
  const classes = useStyles();
  const user = useAuth();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography className={classes.grow}>
            {user ? `Signed in as ${user.email}` : "Not signed in"}
          </Typography>
          <LoginButtons />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
