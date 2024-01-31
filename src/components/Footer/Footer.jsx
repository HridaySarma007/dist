/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import styles from "./footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <p className={classes.right}>
        <span>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.agrithinks.com"
            target="_blank"
            className={classes.a}
          >
            Agrithink Services LLP
          </a>
        </span>
      </p>
    </footer>
  );
}
