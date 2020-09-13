/*global Pts:true */
import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_POINTS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const { Polygon, CanvasSpace, Pt } = Pts;

const createBodyPart = ({ space, points, closeStroke = false, style }) => {
  const form = space.getForm();

  space.add((time, ftime) => {
    const bodyPart = Polygon.lines(points, closeStroke);
    form.stroke("#fff", 4, "round", "round").fill("white").polygons(bodyPart);
  });
};

const createBody = ({ space, body }) => {
  return Object.keys(BODY_PART_POINTS).map((name) => {
    const { points, ...otherArgs } = BODY_PART_POINTS[name];
    return createBodyPart({
      space,
      points: points.map((bodyPartName) => {
        const { x, y } = body[bodyPartName];
        return new Pt(x, y);
      }),
      ...otherArgs,
    });
  });
};

const init = ({ image }) => {
  const { width, height } = image;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  // Add canvas to page
  document.body.appendChild(canvas);

  const space = new CanvasSpace(canvas);
  space.setup({ bgcolor: "#000", resize: true, retina: true });

  const form = space.getForm();

  space.add((time, ftime) => {
    form.fill("white").font(16).text(new Pt(0, 16), "Pts.js");
  });

  space.bindMouse().bindTouch().play();

  return space;
};

document.addEventListener("DOMContentLoaded", function () {
  const space = init({ image: poseExample.image });
  createBody({
    space,
    body: poseToBody({ pose: poseExample.poses[0] }),
  });
  createBody({
    space,
    body: poseToBody({ pose: poseExample2.poses[0] }),
  });
});
