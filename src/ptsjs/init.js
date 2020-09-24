/*global Pts:true */
import { RENDERER_TYPES } from "./constants";

const { CanvasSpace, SVGSpace, Pt } = Pts;

export const init = ({ image, type = RENDERER_TYPES.canvas }) => {
  const { width, height } = image;

  let space;
  if (type === RENDERER_TYPES.canvas) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.cursor = "pointer";

    // Add canvas to page
    document.body.appendChild(canvas);

    space = new CanvasSpace(canvas);
  } else if (type === RENDERER_TYPES.svg) {
    const svgContainer = document.createElement("div");
    svgContainer.style.width = `${width}px`;
    svgContainer.style.height = `${height}px`;
    svgContainer.style.cursor = "pointer";

    // Add svg to page
    document.body.appendChild(svgContainer);

    space = new SVGSpace(svgContainer);
  } else {
    throw new Error(`Invalid renderer type: ${type}`);
  }

  space.setup({ bgcolor: "#000", retina: true });

  const form = space.getForm();
  space.add(function (time, ftime) {
    // Required for SVGForm
    form.scope && form.scope(this);

    form.fill("white").font(16).text(new Pt(0, 16), "Pts.js");
    form.fill("white").font(16).text(new Pt(60, 16), type);
  });

  space.bindMouse().bindTouch().play();

  return space;
};
