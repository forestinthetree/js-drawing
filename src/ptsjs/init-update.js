/*global Pts:true */
import { BODY_PART_GROUPS } from "../drawing/constants";

const { Polygon, Pt } = Pts;

const getBodyParts = (body) => {
  const bodyParts = {};
  Object.keys(BODY_PART_GROUPS).forEach((name) => {
    const { pointNames, closeStroke } = BODY_PART_GROUPS[name];

    // Create body part
    const bodyPartPoints = pointNames.map((bodyPartName) => {
      const { x, y } = body[bodyPartName];
      return new Pt(x, y);
    });

    bodyParts[name] = Polygon.lines(bodyPartPoints, closeStroke);
  });

  return bodyParts;
};

export const initUpdate = ({ space, generator }) => {
  space.clear();
  generator.start();

  const form = space.getForm();
  space.add(function () {
    // Required for SVGForm
    form.scope && form.scope(this);

    const bodyParts = getBodyParts(generator.value);
    Object.values(bodyParts).forEach((bodyPart) => {
      form.stroke("#fff", 4, "round", "round").fill("white").polygons(bodyPart);
    });
  });
};
