import { fn } from "@storybook/test";
import Button from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  args: {
    variant: "primary",
    size: "large",
    children: "Button Primary",
  },
};

export const Secondary = {
  args: {
    children: "Button",
  },
};

export const Large = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Small = {
  args: {
    size: "small",
    children: "Button",
  },
};
