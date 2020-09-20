/*global Two:true */
import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_GROUPS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const createBodyPart = ({ two, points, closeStroke = false, style }) => {
  const bodyPart = two.makePath(...points, !closeStroke);
  bodyPart.stroke = "#fff";
  bodyPart.fill = "transparent";
  bodyPart.linewidth = 4;
  bodyPart.cap = "round";
  bodyPart.join = "round";
};

const createBody = ({ two, body }) => {
  Object.keys(BODY_PART_GROUPS).map((name) => {
    const { pointNames, ...otherArgs } = BODY_PART_GROUPS[name];
    return createBodyPart({
      two,
      points: pointNames
        .map((bodyPartName) => {
          const { x, y } = body[bodyPartName];
          return [x, y];
        })
        .flat(),
      ...otherArgs,
    });
  });
};

const init = ({ image }) => {
  const { width, height } = image;
  var two = new Two({
    width,
    height,
  }).appendTo(document.body);

  two.renderer.domElement.style.background = "black";

  // Centers text by default
  two.makeText("TwoJS", 26, 16, {
    size: 16,
    fill: "#fff",
  });

  return two;
};

document.addEventListener("DOMContentLoaded", function () {
  const two = init({ image: poseExample.image });
  createBody({
    two,
    body: poseToBody({ pose: poseExample.poses[0] }),
  });
  createBody({
    two,
    body: poseToBody({ pose: poseExample2.poses[0] }),
  });

  two.update();
});
