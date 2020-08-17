import * as React from "react";
import { ReactElement } from "react";
import { createUseStyles } from "react-jss";

import { Note } from "./types";
import { FormattedDate } from "./FormattedDate";
import { Attribution } from "./Attribution";

const useStyles = createUseStyles({
  card: {
    fontFamily: "sans-serif",
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
  content: {
    fontSize: "larger",
  },
  date: {
    color: "rgb(0, 0, 0, 60%)",
  },
});

export const NoteCard = ({
  content,
  published,
  attributedTo,
}: Note): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Attribution to={attributedTo} />
      <p className={classes.content}>{content}</p>
      <FormattedDate className={classes.date} value={published} />
    </div>
  );
};
