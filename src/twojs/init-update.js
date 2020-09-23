/*global Two:true */
import { BODY_PART_GROUPS } from "../drawing/constants";

const { Anchor, Path } = Two;

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

export const initUpdate = ({ two, generator }) => {
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
