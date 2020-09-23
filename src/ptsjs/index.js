import { getUrlParameters } from "../utils/get-url-parameters";

import poseToBody from "../drawing/pose-to-body";

import { init } from "./init";
import { initUpdate } from "./init-update";
import { createPlayControls } from "./create-play-controls";

import poseExample from "../data/poseExample";
import poseExample2 from "../data/poseExample2";

import { createUpdateGenerator } from "../data/create-update-generator";

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
