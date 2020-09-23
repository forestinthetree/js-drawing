/*global Two:true */
const { Polygon, Rectangle } = Two;

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

export const createPlayControls = ({ two, generators }) => {
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
