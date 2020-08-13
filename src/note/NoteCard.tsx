import * as React from "react";

import { Note } from "./data";
import { ReactElement } from "react";

export const NoteCard = ({ content }: Note): ReactElement => (
  <div>
    <h2>Activity Streams Note:</h2>
    <p>{content}</p>
  </div>
);
