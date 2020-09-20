/*global paper:true */
import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_GROUPS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const { Path, Point, PointText } = paper;

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

  return Object.keys(BODY_PART_GROUPS).map((name) => {
    const { pointNames, ...otherArgs } = BODY_PART_GROUPS[name];
    return createBodyPart({
      name,
      points: pointNames.map((bodyPartName) => {
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

  new PointText({
    point: [0, 16],
    content: "Paper.js",
    fillColor: "white",
    fontSize: 16,
  });
};

document.addEventListener("DOMContentLoaded", function () {
  init({ image: poseExample.image });
  createBody({
    body: poseToBody({ pose: poseExample.poses[0] }),
  });
  createBody({
    body: poseToBody({ pose: poseExample2.poses[0] }),
  });
});
