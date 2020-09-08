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

const init = ({ image }) => {
  const { width, height } = image;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style["background-color"] = "black";

  // Add canvas to page
  document.body.appendChild(canvas);

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
  init({ image: poseExample.image });
  initBody({
    name: "body1",
    body: poseToBody({ pose: poseExample.poses[0] }),
  });
  initBody({
    name: "body2",
    body: poseToBody({ pose: poseExample2.poses[0] }),
  });
});
