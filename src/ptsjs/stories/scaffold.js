/*global Pts:true */
import React, { useEffect, useRef, useState } from "react";

import { RENDERER_TYPES } from "../constants";

const { CanvasSpace, SVGSpace } = Pts;

const createCanvas = ({ ref, width, height, style = {} }) => {
  return <canvas ref={ref} width={width} height={height} style={style} />;
};

const createSVGDiv = ({ ref, width, height, style }) => {
  const divStyles = {
    width: `${width}px`,
    height: `${height}px`,
    ...style,
  };
  return <div ref={ref} style={divStyles} />;
};

const createElement = ({ type, ref, width, height, style }) => {
  let element;
  if (type === RENDERER_TYPES.canvas) {
    element = createCanvas({ ref, width, height, style });
  } else if (type === RENDERER_TYPES.svg) {
    element = createSVGDiv({ ref, width, height, style });
  }

  return element;
};

export function useSpace({ type, width = 300, height = 400, style }) {
  const ref = useRef();
  const [element, setElement] = useState(null);
  const [space, setSpace] = useState(null);

  useEffect(() => {
    const element = createElement({
      type,
      ref,
      width,
      height,
      style,
    });
    setElement(element);
  }, [height, style, type, width]);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (type === RENDERER_TYPES.canvas) {
      const space = new CanvasSpace(ref.current);
      setSpace(space);
    } else if (type === RENDERER_TYPES.svg) {
      const space = new SVGSpace(ref.current);
      setSpace(space);
    }
  }, [element, height, style, type, width]);

  return {
    element,
    space,
  };
}

function drawInSpace({ space, controls, draw }) {
  const form = space.getForm();
  space.add(function () {
    draw({ space, form, controls });
  });

  space.bindMouse().bindTouch().play();
}

export function Scaffold({
  type,
  width,
  height,
  backgroundColor,
  style,
  draw,
  ...args
}) {
  const controls = useRef(args);
  const { element, space } = useSpace({ type, width, height, style });

  // Run draw function when space is set up
  useEffect(() => {
    if (!draw || !space) {
      return;
    }
    drawInSpace({ space, controls, draw });
  }, [draw, space]);

  // Set up space with background color
  useEffect(() => {
    if (!space) {
      return;
    }
    space.setup({ bgcolor: backgroundColor, retina: true });
  }, [backgroundColor, space]);

  // Update args as they change
  // Using a ref so that it doesn't cause a re-render
  useEffect(() => {
    controls.current = args;
  }, [args]);

  return element;
}
