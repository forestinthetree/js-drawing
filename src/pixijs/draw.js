/*global PIXI:true */

import poseToBody from "../drawing/pose-to-body";
import { BODY_PART_POINTS } from "../drawing/constants";

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

const createBody = ({ app, body }) => {
  Object.values(BODY_PART_POINTS).forEach(({ points, ...otherArgs }) => {
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
