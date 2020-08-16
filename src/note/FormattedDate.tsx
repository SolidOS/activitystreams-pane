import { ReactElement } from "react";
import * as React from "react";

import { format } from "timeago.js";

interface Props {
  value: Date;
}

const twoDigitsDateTime = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

export const FormattedDate = ({ value }: Props): ReactElement => {
  if (!value) return null;
  const formatted = value.toLocaleDateString(undefined, twoDigitsDateTime);
  const relative = format(value);
  return (
    <p>
      {relative} · {formatted}
    </p>
  );
};
