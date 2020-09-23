/*global Pts:true */
import { getUrlParameters } from "../utils/get-url-parameters";

import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_GROUPS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

import { createUpdateGenerator } from "../data/create-update-generator";

const RENDERER_TYPES = {
  canvas: "canvas",
  svg: "svg",
};

const { Polygon, CanvasSpace, SVGSpace, Pt, Triangle, Rectangle } = Pts;

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
  space.add(function () {
    // Required for SVGForm
    form.scope && form.scope(this);

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

  const playIcon = Triangle.fromCenter(new Pt(25, 45), 10).rotate2D(33);
  const stopIcon = Rectangle.polygon(Rectangle.fromCenter(new Pt(17, 35), 17));
  space.add({
    animate() {
      // Required for SVGForm
      form.scope && form.scope(this);

      const polygon = state.isPlaying ? playIcon : stopIcon;
      form.fill("#fff").polygon(polygon);
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

const init = ({ image, type = RENDERER_TYPES.canvas }) => {
  const { width, height } = image;

  let space;
  if (type === RENDERER_TYPES.canvas) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.cursor = "pointer";

    // Add canvas to page
    document.body.appendChild(canvas);

    space = new CanvasSpace(canvas);
  } else if (type === RENDERER_TYPES.svg) {
    const svgContainer = document.createElement("div");
    svgContainer.style.width = `${width}px`;
    svgContainer.style.height = `${height}px`;
    svgContainer.style.cursor = "pointer";

    // Add svg to page
    document.body.appendChild(svgContainer);

    space = new SVGSpace(svgContainer);
  } else {
    throw new Error(`Invalid renderer type: ${type}`);
  }

  space.setup({ bgcolor: "#000", retina: true });

  const form = space.getForm();
  space.add(function (time, ftime) {
    // Required for SVGForm
    form.scope && form.scope(this);

    form.fill("white").font(16).text(new Pt(0, 16), "Pts.js");
    form.fill("white").font(16).text(new Pt(60, 16), type);
  });

  space.bindMouse().bindTouch().play();

  return space;
};

document.addEventListener("DOMContentLoaded", function () {
  const { type } = getUrlParameters(window.location.href);
  const space = init({ image: poseExample.image, type });

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
