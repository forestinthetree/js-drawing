/*global PIXI:true */

import poseToBody from "../drawing/pose-to-body";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

const { Graphics, Application, Point } = PIXI;

const createBodyPart = ({ points, closeStroke = false }) => {
  const bodyPart = new Graphics();
  bodyPart.lineStyle(4, 0xffffff, 1);
  bodyPart.drawPolygon(points);
  bodyPart.geometry.graphicsData[0].shape.closeStroke = closeStroke;

  return bodyPart;
};

const bodyPartCreateArgs = {
  head: {
    points: ["neck", "leftEar", "foreHead", "rightEar"],
    closeStroke: true,
  },
  torso: {
    points: ["leftShoulder", "rightShoulder", "rightHip", "leftHip"],
    closeStroke: true,
  },
  leftArm: {
    points: ["leftShoulder", "leftElbow", "leftWrist"],
  },
  rightArm: {
    points: ["rightShoulder", "rightElbow", "rightWrist"],
  },
  leftLeg: {
    points: ["leftHip", "leftKnee", "leftAnkle"],
  },
  rightLeg: {
    points: ["rightHip", "rightKnee", "rightAnkle"],
  },
};

const createBody = ({ app, body }) => {
  Object.values(bodyPartCreateArgs).forEach(({ points, ...otherArgs }) => {
    const bodyPart = createBodyPart({
      points: points.map((bodyPartName) => {
        const { x, y } = body[bodyPartName];
        return new Point(x, y);
      }),
      ...otherArgs,
    });
    app.stage.addChild(bodyPart);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    autoDensity: true,
    resolution: window.devicePixelRatio,
  });

  // Make full screen
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);

  createBody({
    app,
    body: poseToBody({
      pose: poseExample.poses[0],
    }),
  });
  createBody({
    app,
    body: poseToBody({
      pose: poseExample2.poses[0],
    }),
  });
});
