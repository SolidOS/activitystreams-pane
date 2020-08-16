import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  card: {
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "4px",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1em",
    boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
    alignItems: "center",
    transition: "all .25s ease-in-out",
    width: "100%",
  },
});

import { Note } from "./data";
import { ReactElement } from "react";

export const NoteCard = ({ content }: Note): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <p>{content}</p>
    </div>
  );
};
