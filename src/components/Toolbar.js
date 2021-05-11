import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  MenuItem,
  Select,
  IconButton,
  Link,
  Avatar,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ToolbarTop({ onCountryChange, country, countries }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jina Covid Tracker
          </Typography>
          {/* contacts */}
          <Link
            target="blank_"
            color="inherit"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jinacoolprojects@gmail.com">
            <IconButton color="inherit">
              <Avatar
                style={{ width: "1.5em", height: "1.5em" }}
                src={google}
              />
            </IconButton>
          </Link>
          <Link
            target="blank_"
            color="inherit"
            href="https://www.linkedin.com/in/bargady-ahmed-082b30177">
            <IconButton color="inherit">
              <Avatar
                style={{ width: "1.5em", height: "1.5em" }}
                src={linkedin}
              />
            </IconButton>
          </Link>
          <Link
            target="blank_"
            color="inherit"
            href="https://twitter.com/AhmedBargady?s=09">
            <IconButton color="inherit">
              <Avatar
                style={{ width: "1.5em", height: "1.5em" }}
                src={twitter}
              />
            </IconButton>
          </Link>
          <Link
            target="blank_"
            color="inherit"
            href="https://github.com/AhmedCoolProjects">
            <IconButton color="inherit">
              <Avatar
                style={{ width: "1.5em", height: "1.5em" }}
                src={github}
              />
            </IconButton>
          </Link>
          {/* dropdown countries */}
          <Select onChange={onCountryChange} value={country} variant="outlined">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
    </div>
  );
}
