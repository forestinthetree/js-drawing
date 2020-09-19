export const BODY_PART_POINTS = {
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
    closeStroke: false,
  },
  rightArm: {
    points: ["rightShoulder", "rightElbow", "rightWrist"],
    closeStroke: false,
  },
  leftLeg: {
    points: ["leftHip", "leftKnee", "leftAnkle"],
    closeStroke: false,
  },
  rightLeg: {
    points: ["rightHip", "rightKnee", "rightAnkle"],
    closeStroke: false,
  },
};
