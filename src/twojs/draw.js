/*global Two:true */
import { getUrlParameters } from "../utils/get-url-parameters";

import poseToBody from "../drawing/pose-to-body";

import { BODY_PART_GROUPS } from "../drawing/constants";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

import { createUpdateGenerator } from "../data/create-update-generator";

const { Anchor, Polygon, Types, Path, Rectangle } = Two;
const RENDERER_TYPES = {
  canvas: "canvas",
  svg: "svg",
  webgl: "webgl",
};

const getBodyParts = ({ body }) => {
  const bodyParts = {};
  Object.keys(BODY_PART_GROUPS).forEach((name) => {
    const { pointNames, closeStroke } = BODY_PART_GROUPS[name];

    // Create body part
    const bodyPartPoints = pointNames.map((bodyPartName) => {
      const { x, y } = body[bodyPartName];
      return new Anchor(x, y);
    });

    bodyParts[name] = {
      bodyPartPoints,
      closeStroke,
    };
  });

  return bodyParts;
};

const createBodyParts = ({ bodyParts, renderedBodyParts }) => {
  if (renderedBodyParts && Object.keys(renderedBodyParts).length) {
    Object.keys(BODY_PART_GROUPS).forEach((name) => {
      const { bodyPartPoints } = bodyParts[name];
      const renderedBodyPart = renderedBodyParts[name];

      renderedBodyPart.vertices.forEach((point, index) => {
        const newPoint = bodyPartPoints[index];
        point.set(newPoint.x, newPoint.y);
      });
    });

    return renderedBodyParts;
  } else {
    const newBodyParts = {};
    Object.keys(BODY_PART_GROUPS).forEach((name) => {
      const { bodyPartPoints, closeStroke } = bodyParts[name];
      const bodyPart = new Path(bodyPartPoints, closeStroke);
      bodyPart.stroke = "#fff";
      bodyPart.fill = "transparent";
      bodyPart.linewidth = 4;
      bodyPart.cap = "round";
      bodyPart.join = "round";

      newBodyParts[name] = bodyPart;
    });

    return newBodyParts;
  }
};

const initUpdate = ({ two, generator }) => {
  generator.start();

  let renderedBodyParts;
  two
    .bind("update", function (frameCount) {
      const bodyParts = getBodyParts({ body: generator.value });
      const newRenderedBodyParts = createBodyParts({
        bodyParts,
        renderedBodyParts,
      });
      renderedBodyParts = newRenderedBodyParts;

      Object.values(renderedBodyParts).forEach((bodyPart) => {
        two.add(bodyPart);
      });
    })
    .play();
};

const createPlayIcon = () => {
  const x = 17;
  const y = 40;
  const radius = 10;
  const sides = 3;
  const playIcon = new Polygon(x, y, radius, sides);
  playIcon.stroke = "#fff";
  playIcon.linewidth = 4;
  playIcon.cap = "round";
  playIcon.join = "round";
  playIcon.rotation = 32.98;

  return playIcon;
};

const createStopIcon = () => {
  const x = 17;
  const y = 40;
  const width = 15;
  const height = 15;
  const stopIcon = new Rectangle(x, y, width, height);
  stopIcon.stroke = "#fff";
  stopIcon.linewidth = 4;
  stopIcon.cap = "round";
  stopIcon.join = "round";

  return stopIcon;
};

const createPlayControls = ({ two, generators }) => {
  const state = {
    isPlaying: true,
  };

  const playIcon = createPlayIcon();
  const stopIcon = createStopIcon();
  const drawIcon = () => {
    if (state.isPlaying) {
      two.add(playIcon);
      two.remove(stopIcon);
    } else {
      two.add(stopIcon);
      two.remove(playIcon);
    }
  };

  drawIcon();
  two.renderer.domElement.onclick = () => {
    state.isPlaying = !state.isPlaying;

    if (state.isPlaying) {
      generators.forEach((generator) => generator.start());
    } else {
      generators.forEach((generator) => generator.stop());
    }

    drawIcon();
  };

  return state;
};

const init = ({ image, type = RENDERER_TYPES.canvas }) => {
  const { width, height } = image;
  const two = new Two({
    type: Types[type],
    width,
    height,
  }).appendTo(document.body);

  two.renderer.domElement.style.background = "black";
  two.renderer.domElement.style.cursor = "pointer";

  // Centers text by default
  two.makeText("TwoJS", 26, 16, {
    size: 16,
    fill: "#fff",
  });
  two.makeText(type, 90, 16, {
    size: 16,
    fill: "#fff",
  });

  return two;
};

document.addEventListener("DOMContentLoaded", function () {
  const { type } = getUrlParameters(window.location.href);
  const two = init({ image: poseExample.image, type });

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
  createPlayControls({ two, generators: [pose1Generator, pose2Generator] });

  initUpdate({
    two,
    generator: pose1Generator,
  });
  initUpdate({
    two,
    generator: pose2Generator,
  });
});
