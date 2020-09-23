/*global Pts:true */
const { Pt, Triangle, Rectangle } = Pts;

export const createPlayControls = ({ space, generators }) => {
  const state = {
    isPlaying: true,
  };
  const form = space.getForm();

  const playIcon = Triangle.fromCenter(new Pt(25, 45), 10).rotate2D(33);
  const stopIcon = Rectangle.polygon(Rectangle.fromCenter(new Pt(17, 35), 17));
  space.add({
    animate() {
      // Required for SVGForm
      form.scope && form.scope(this);

      const polygon = state.isPlaying ? playIcon : stopIcon;
      form.fill("#fff").polygon(polygon);
    },
    action: (type) => {
      if (type === "up") {
        state.isPlaying = !state.isPlaying;

        if (state.isPlaying) {
          generators.forEach((generator) => generator.start());
        } else {
          generators.forEach((generator) => generator.stop());
        }
      }
    },
  });

  return state;
};
