import * as React from "react";

import { NoteCard, Note } from "../note";

import { Story, Meta } from "@storybook/react";
import { sym } from "rdflib";

export default {
  title: "NoteCard",
  component: NoteCard,
} as Meta;

const Template: Story = (args: Note) => <NoteCard {...args} />;

export const TextOnly = Template.bind({});
TextOnly.args = {
  content:
    "This is a simple note, just showing some textual content. No author, no date, nothing but the text.",
};

export const PublishedJustNow = Template.bind({});
PublishedJustNow.args = {
  content: "This is a simple textual note, that was published just now",
  published: new Date(),
};

export const PublishedLastWeek = Template.bind({});
PublishedLastWeek.args = {
  content: "This is a simple textual note, that was published last week",
  published: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
};

export const PublishedLastYear = Template.bind({});
PublishedLastYear.args = {
  content: "This is a simple textual note, that was published last year",
  published: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000),
};

export const AttributedTo = Template.bind({});
AttributedTo.args = {
  content: "This is a simple textual note, attributed to a person",
  attributedTo: sym("https://pod.example/person#me"),
};

export const PublishedAndAttributed = Template.bind({});
PublishedAndAttributed.args = {
  content: "This is a simple textual note, attributed to a person",
  attributedTo: sym("https://pod.example/person#me"),
  published: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
};
