import * as React from "react";

/*
 importing from "../note" currently fails due missing node builtIns (fs)
 */
import { NoteCard } from "../note/NoteCard";
import { Note } from "../note/types";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

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

export const Published = Template.bind({});
Published.args = {
  content: "This is a simple textual note with a published date",
  published: new Date(),
};
