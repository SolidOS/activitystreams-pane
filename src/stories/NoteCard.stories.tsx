import * as React from "react";

import { Note, NoteCard } from "../note";

import { Meta, Story } from "@storybook/react";

export default {
  title: "NoteCard",
  component: NoteCard,
} as Meta;

const Template: Story = (args: Note) => <NoteCard {...args} />;

export const TextOnly = Template.bind({});
TextOnly.args = {
  attributedTo: { discriminator: "NoAttribution" },
  content:
    "This is a simple note, just showing some textual content. No author, no date, nothing but the text.",
};

export const PublishedJustNow = Template.bind({});
PublishedJustNow.args = {
  attributedTo: { discriminator: "NoAttribution" },
  content: "This is a simple textual note, that was published just now",
  published: new Date(),
};

export const PublishedLastWeek = Template.bind({});
PublishedLastWeek.args = {
  attributedTo: { discriminator: "NoAttribution" },
  content: "This is a simple textual note, that was published last week",
  published: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
};

export const PublishedLastYear = Template.bind({});
PublishedLastYear.args = {
  attributedTo: { discriminator: "NoAttribution" },
  content: "This is a simple textual note, that was published last year",
  published: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000),
};

export const AttributedToLink = Template.bind({});
AttributedToLink.args = {
  attributedTo: {
    discriminator: "LinkAttribution",
    uri: "https://pod.example/person#me",
  },
  content: "This is a simple textual note, attributed to a person",
  published: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
};

export const AttributedToPerson = Template.bind({});
AttributedToPerson.args = {
  attributedTo: {
    discriminator: "PersonAttribution",
    webId: "https://pod.example/person#me",
    name: "Jane Doe",
    imageSrc: "https://i.pravatar.cc/300",
  },
  content: "This is a simple textual note, attributed to a person",
  published: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
};
