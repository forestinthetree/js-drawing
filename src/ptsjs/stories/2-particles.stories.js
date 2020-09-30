import React from "react";
import { QuickStartCanvas } from "react-pts-canvas";
import { World, Create, Particle, Num, Pt } from "pts";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { withPreview } from "storybook-addon-preview";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Pts.js/2. Particles",
  component: QuickStartCanvas,
  decorators: [withKnobs, withPreview],
  argTypes: {},
};

const Template = (args) => <QuickStartCanvas {...args} />;

const createTemplate = (args) => {
  let output = "<QuickStartCanvas \n";
  Object.keys(args).forEach((key) => {
    const fn = args[key];
    const fnString = fn.toString();
    output += `\t${key}={${fnString}}\n`;
  });
  output += "/>";

  return output;
};

// Particles demo from https://ptsjs.org/demo/edit/?name=physics.particles
let world;
export const Particles = Template.bind({});
Particles.args = {
  onStart: (bound, space) => {
    // Create world and 100 random points
    world = new World(space.innerBound, 1, 0);
    let pts = Create.distributeRandom(space.innerBound, 100);

    // Create particles and hit them with a random impulse
    for (let i = 0, len = pts.length; i < len; i++) {
      let p = new Particle(pts[i]).size(
        i === 0 ? 30 : 3 + (Math.random() * space.size.x) / 50
      );
      p.hit(Num.randomRange(-50, 50), Num.randomRange(-25, 25));
      world.add(p);
    }

    world.particle(0).lock = true; // lock it to move it by pointer later on
  },

  onAnimate: (space, form, time, ftime) => {
    world.drawParticles((p, i) => {
      let color =
        i === 0 ? "#fff" : ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i % 4];
      form.fillOnly(color).point(p, p.radius, "circle");
    });

    world.update(ftime);
  },

  onAction: (space, form, type, px, py, evt) => {
    if (type === "move") {
      world.particle(0).position = new Pt(px, py);
    }
  },

  onResize: (space, form, size, evt) => {
    if (world) world.bound = space.innerBound;
  },
};
Particles.parameters = {
  preview: [
    {
      tab: "React",
      template: createTemplate(Particles.args),
      language: "jsx",
      codesandbox: DEFAULT_REACT_CODESANDBOX(["@egjs/react-infinitegrid"]),
    },
  ],
};
