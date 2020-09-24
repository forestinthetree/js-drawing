/*global Pts:true */
import React from "react";

import { Scaffold } from "./scaffold";

import { RENDERER_TYPES } from "./constants";
import { radiusControl, sizeControl } from "../stories/utils/controls";

export default {
  title: "Pts.js/Basic shapes",
  component: Scaffold,
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

export const DrawRectangle = Template.bind({});
DrawRectangle.argTypes = {
  size: sizeControl,
};
DrawRectangle.args = {
  size: 50,
  draw: function ({ space, form, controls }) {
    const { Rectangle, Pt } = Pts;

    const { fill, size } = controls.current;
    const { x, y } = space.center;

    form.fill(fill).rect(Rectangle.fromCenter(new Pt(x, y), size));
  },
};

export const DrawRectangleAsPolygon = Template.bind({});
DrawRectangleAsPolygon.argTypes = {
  size: sizeControl,
};
DrawRectangleAsPolygon.args = {
  size: 50,
  draw: function ({ space, form, controls }) {
    const { Rectangle, Pt } = Pts;

    const { fill, size } = controls.current;
    const { x, y } = space.center;

    const polygon = Rectangle.polygon(Rectangle.fromCenter(new Pt(x, y), size));
    form.fill(fill).polygon(polygon);
  },
};

export const DrawCircle = Template.bind({});
DrawCircle.argTypes = {
  radius: radiusControl,
};
DrawCircle.args = {
  radius: 25,
  draw: function ({ space, form, controls }) {
    const { Circle, Pt } = Pts;

    const { fill, radius } = controls.current;
    const { x, y } = space.center;

    form.fill(fill).circle(Circle.fromCenter(new Pt(x, y), radius));
  },
};
