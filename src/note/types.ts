import { Node } from "rdflib";

export interface Note {
  content: string;
  published?: Date;
  attributedTo?: Node;
}
