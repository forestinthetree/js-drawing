/*global Pts:true */
import React from "react";
import { withPreview } from "storybook-addon-preview";
import { withKnobs } from "@storybook/addon-knobs";

import { Scaffold } from "./scaffold";

import { createDrawStory } from "../stories/utils/create-draw-story";

import { RENDERER_TYPES } from "./constants";
import { radiusControl, sizeControl } from "../stories/utils/controls";

export default {
  title: "Pts.js/Basic shapes",
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
    const { Rectangle, Pt } = Pts;
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
    const { Rectangle, Pt } = Pts;
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
    const { Circle, Pt } = Pts;
    const { x, y } = space.center;

    form.fill(fill).circle(Circle.fromCenter(new Pt(x, y), radius));
  },
});
