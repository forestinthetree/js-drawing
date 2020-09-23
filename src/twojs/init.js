/*global Two:true */
const RENDERER_TYPES = {
  canvas: "canvas",
  svg: "svg",
  webgl: "webgl",
};

const { Types } = Two;

export const init = ({ image, type = RENDERER_TYPES.canvas }) => {
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
