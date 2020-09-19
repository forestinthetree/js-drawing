function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomPositionOfDelta = (delta) => ({ x, y }) => {
  return {
    x: x + randomInt(-delta, delta),
    y: y + randomInt(-delta, delta),
  };
};

function generateBodyUpdate({ baseBody, delta = 0 }) {
  const newBody = {};
  const randomPosition = randomPositionOfDelta(delta);

  Object.keys(baseBody).forEach((name) => {
    const { x, y, ...rest } = baseBody[name];

    const randPos = randomPosition({ x, y });

    newBody[name] = {
      ...rest,
      x: randPos.x,
      y: randPos.y,
    };
  });

  return newBody;
}

export function createUpdateGenerator({ body, interval = 1000, delta = 3 }) {
  const generator = {
    value: body,
  };
  let updaterInterval;
  generator.start = () => {
    const run = () => {
      generator.value = generateBodyUpdate({ baseBody: body, delta });
    };
    updaterInterval = setInterval(run, interval);
    run();
  };
  generator.stop = () => {
    clearInterval(updaterInterval);
  };

  return generator;
}
