const createNeck = (body) => {
  if (!body.rightShoulder || !body.leftShoulder) {
    return {
      ignore: true,
    };
  }

  return {
    x: body.rightShoulder.x + (body.leftShoulder.x - body.rightShoulder.x) / 2,
    y: body.rightShoulder.y + (body.leftShoulder.y - body.rightShoulder.y) / 2,
  };
};

const createForhead = (body) => {
  if (!body.neck || !body.nose) {
    return {
      ignore: true,
    };
  }

  return {
    x: body.neck.x - (body.neck.x - body.nose.x) * 1.75,
    y: body.neck.y - (body.neck.y - body.nose.y) * 1.75,
  };
};

const poseToBody = ({ pose = {}, posePartFilter = 0 }) => {
  let body = {};

  if (!pose.keypoints) {
    return;
  }
  pose.keypoints.forEach((kp) => {
    body[kp.part] = {
      x: kp.position.x,
      y: kp.position.y,
      ignore: kp.score < posePartFilter,
    };
  });

  body.neck = createNeck(body);
  body.foreHead = createForhead(body);

  return body;
};

export default poseToBody;
