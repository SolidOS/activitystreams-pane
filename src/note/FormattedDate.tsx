import { ReactElement } from "react";
import * as React from "react";

interface Props {
  value: Date;
}

export const FormattedDate = ({ value }: Props): ReactElement => {
  if (!value) return null;
  return <p>{value.toLocaleDateString()}</p>;
};
