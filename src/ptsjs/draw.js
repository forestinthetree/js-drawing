/*global Pts:true */
import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_GROUPS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

import { createUpdateGenerator } from "../data/create-update-generator";

const { Polygon, CanvasSpace, Pt, Triangle, Rectangle } = Pts;

const getBodyParts = (body) => {
  const bodyParts = {};
  Object.keys(BODY_PART_GROUPS).forEach((name) => {
    const { pointNames, closeStroke } = BODY_PART_GROUPS[name];

    // Create body part
    const bodyPartPoints = pointNames.map((bodyPartName) => {
      const { x, y } = body[bodyPartName];
      return new Pt(x, y);
    });

    bodyParts[name] = Polygon.lines(bodyPartPoints, closeStroke);
  });

  return bodyParts;
};

const initUpdate = ({ space, generator }) => {
  space.clear();
  generator.start();

  const form = space.getForm();
  space.add(() => {
    const bodyParts = getBodyParts(generator.value);
    Object.values(bodyParts).forEach((bodyPart) => {
      form.stroke("#fff", 4, "round", "round").fill("white").polygons(bodyPart);
    });
  });
};

const createPlayControls = ({ space, generators }) => {
  const state = {
    isPlaying: true,
  };
  const form = space.getForm();

  space.add({
    animate: () => {
      if (state.isPlaying) {
        const playIcon = Triangle.fromCenter(new Pt(25, 45), 10).rotate2D(33);
        form.fill("#fff").polygon(playIcon);
      } else {
        const stopIcon = Rectangle.fromCenter(new Pt(17, 35), 17);
        form.fill("#fff").rect(stopIcon);
      }
    },
    action: (type) => {
      if (type === "up") {
        state.isPlaying = !state.isPlaying;

        if (state.isPlaying) {
          generators.forEach((generator) => generator.start());
        } else {
          generators.forEach((generator) => generator.stop());
        }
      }
    },
  });

  return state;
};

const init = ({ image }) => {
  const { width, height } = image;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.cursor = "pointer";

  // Add canvas to page
  document.body.appendChild(canvas);

  const space = new CanvasSpace(canvas);
  space.setup({ bgcolor: "#000", retina: true });

  const form = space.getForm();

  space.add((time, ftime) => {
    form.fill("white").font(16).text(new Pt(0, 16), "Pts.js");
  });

  space.bindMouse().bindTouch().play();

  return space;
};

document.addEventListener("DOMContentLoaded", function () {
  const space = init({ image: poseExample.image });

  const pose1Generator = createUpdateGenerator({
    body: poseToBody({ pose: poseExample.poses[0] }),
    interval: 100,
    delta: 10,
  });
  const pose2Generator = createUpdateGenerator({
    body: poseToBody({ pose: poseExample2.poses[0] }),
    interval: 100,
    delta: 10,
  });
  createPlayControls({ space, generators: [pose1Generator, pose2Generator] });

  initUpdate({
    space,
    generator: pose1Generator,
  });
  initUpdate({
    space,
    generator: pose2Generator,
  });
});
