export const BODY_PART_GROUPS = {
  head: {
    pointNames: ["neck", "leftEar", "foreHead", "rightEar"],
    closeStroke: true,
  },
  torso: {
    pointNames: ["leftShoulder", "rightShoulder", "rightHip", "leftHip"],
    closeStroke: true,
  },
  leftArm: {
    pointNames: ["leftShoulder", "leftElbow", "leftWrist"],
    closeStroke: false,
  },
  rightArm: {
    pointNames: ["rightShoulder", "rightElbow", "rightWrist"],
    closeStroke: false,
  },
  leftLeg: {
    pointNames: ["leftHip", "leftKnee", "leftAnkle"],
    closeStroke: false,
  },
  rightLeg: {
    pointNames: ["rightHip", "rightKnee", "rightAnkle"],
    closeStroke: false,
  },
};
