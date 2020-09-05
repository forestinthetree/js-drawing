/*global paper:true */
import poseToBody from "../drawing/pose-to-body";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const init = ({ canvas, image }) => {
  const canvasSize = {
    x: image.width,
    y: image.height,
  };

  canvas.style = `width: ${canvasSize.x}px; height: ${canvasSize.y}px; background-color: black;`;
  paper.setup(canvas);
};

const initBody = ({ name: bodyName, body }) => {
  const lineStyle = {
    strokeWidth: 4,
    strokeColor: "#fff",
    strokeJoin: "round",
    strokeCap: "round",
  };

  const makeLimb = (name, bodyParts) => {
    return new paper.Path({
      name: name,
      segments: bodyParts,
      style: lineStyle,
    });
  };

  const headPart = new paper.Path({
    name: "head",
    segments: [body.neck, body.leftEar, body.foreHead, body.rightEar],
    closed: true,
    style: lineStyle,
  });

  const torsoPart = new paper.Path({
    name: "torso",
    segments: [
      body.leftShoulder,
      body.rightShoulder,
      body.rightHip,
      body.leftHip,
    ],
    closed: true,
    style: lineStyle,
  });

  const leftArmPart = makeLimb("leftArm", [
    body.leftShoulder,
    body.leftElbow,
    body.leftWrist,
  ]);
  const rightArmPart = makeLimb("rightArm", [
    body.rightShoulder,
    body.rightElbow,
    body.rightWrist,
  ]);
  const leftLegPart = makeLimb("leftLeg", [
    body.leftHip,
    body.leftKnee,
    body.leftAnkle,
  ]);
  const rightLegPart = makeLimb("rightLeg", [
    body.rightHip,
    body.rightKnee,
    body.rightAnkle,
  ]);

  new paper.Group({
    name: bodyName,
    children: [
      headPart,
      torsoPart,
      leftArmPart,
      rightArmPart,
      leftLegPart,
      rightLegPart,
    ],
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
