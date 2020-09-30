import React from "react";
import { withPreview } from "storybook-addon-preview";
import { withKnobs } from "@storybook/addon-knobs";
import { Circle, Rectangle, Pt } from "pts";

import { createDrawStory } from "../../stories/utils/create-draw-story";
import { radiusControl, sizeControl } from "../../stories/utils/controls";

import { Scaffold } from "./scaffold";
import { RENDERER_TYPES } from "../constants";

export default {
  title: "Pts.js/1. Basic shapes",
  component: Scaffold,
  decorators: [withKnobs, withPreview],
  argTypes: {
    type: {
      control: {
        type: "inline-radio",
        options: RENDERER_TYPES,
      },
      defaultValue: RENDERER_TYPES.canvas,
    },
    backgroundColor: { control: "color", defaultValue: "#000" },
    fill: { control: "color", defaultValue: "#fff" },
  },
};

const Template = (args) => <Scaffold {...args} />;

export const DrawRectangle = createDrawStory({
  Template,
  argTypes: {
    size: sizeControl,
  },
  args: {
    size: 50,
  },
  draw: function ({
    space,
    form,
    controls: {
      current: { fill, size },
    },
  }) {
    const { x, y } = space.center;

    form.fill(fill).rect(Rectangle.fromCenter(new Pt(x, y), size));
  },
});

export const DrawRectangleAsPolygon = createDrawStory({
  Template,
  argTypes: {
    size: sizeControl,
  },
  args: {
    size: 50,
  },
  draw: function ({
    space,
    form,
    controls: {
      current: { fill, size },
    },
  }) {
    const { x, y } = space.center;

    const polygon = Rectangle.polygon(Rectangle.fromCenter(new Pt(x, y), size));
    form.fill(fill).polygon(polygon);
  },
});

export const DrawCircle = createDrawStory({
  Template,
  argTypes: {
    radius: radiusControl,
  },
  args: {
    radius: 25,
  },
  draw: function ({
    space,
    form,
    controls: {
      current: { fill, radius },
    },
  }) {
    const { x, y } = space.center;

    form.fill(fill).circle(Circle.fromCenter(new Pt(x, y), radius));
  },
});
