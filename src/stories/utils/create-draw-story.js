import { DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";

export function createDrawStory({
  Template,
  args,
  argTypes,
  parameters = {},
  draw,
}) {
  const story = Template.bind({});
  story.args = {
    draw,
    ...args,
  };
  story.argTypes = argTypes;
  story.parameters = {
    preview: [
      {
        tab: "Vanilla",
        template: draw.toString(),
        language: "js",
        codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
      },
    ],
    ...parameters,
  };

  return story;
}
