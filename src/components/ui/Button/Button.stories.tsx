import React from "react";
import Button from "./Button";
import { SimpleButtonProps } from "./Button";
import { Meta } from "@storybook/react";

export default {
  title: "Example/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },
  controls: { hideNoControlsWarning: true },
  docs: {
    source: {
      type: `code`,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outlined"],
    },
    size: {
      control: "select",
      options: [`small`, `medium`, `large`],
    },
  },

  children: "Button Primary",
};

export const BasicButton: Meta<SimpleButtonProps> = (args) => (
  <Button {...args}>My basic first button!</Button>
);

BasicButton.args = {
  variant: `primary`,
  size: `medium`,
};
