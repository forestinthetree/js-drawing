/*global paper:true */
import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_POINTS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const { Path, Point, Group } = paper;

const createBodyPart = ({ name, points, closeStroke = false, style }) => {
  const bodyPart = new Path({
    name,
    segments: points,
    closed: closeStroke,
    style,
  });

  return bodyPart;
};

const createBody = ({ body }) => {
  const style = {
    strokeWidth: 4,
    strokeColor: "#fff",
    strokeJoin: "round",
    strokeCap: "round",
  };

  return Object.keys(BODY_PART_POINTS).map((name) => {
    const { points, ...otherArgs } = BODY_PART_POINTS[name];
    return createBodyPart({
      name,
      points: points.map((bodyPartName) => {
        const { x, y } = body[bodyPartName];
        return new Point(x, y);
      }),
      style,
      ...otherArgs,
    });
  });
};

const init = ({ canvas, image }) => {
  const canvasSize = {
    x: image.width,
    y: image.height,
  };

  canvas.style = `width: ${canvasSize.x}px; height: ${canvasSize.y}px; background-color: black;`;
  paper.setup(canvas);
};

const initBody = ({ name: bodyName, body }) => {
  const bodyParts = createBody({ body });

  new Group({
    name: bodyName,
    children: bodyParts,
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#paperCanvas");

  if (!canvas) {
    return;
  }
  init({ canvas, image: poseExample.image });
  initBody({
    name: "body1",
    body: poseToBody({ pose: poseExample.poses[0] }),
  });
  initBody({
    name: "body2",
    body: poseToBody({ pose: poseExample2.poses[0] }),
  });
});
