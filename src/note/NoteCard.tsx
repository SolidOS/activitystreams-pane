import * as React from "react";
import { ReactElement } from "react";
import { createUseStyles } from "react-jss";

import { Note } from "./types";
import { FormattedDate } from "./FormattedDate";

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
  },
});

export const NoteCard = ({ content, published }: Note): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <p>{content}</p>
      <FormattedDate value={published} />
    </div>
  );
};
