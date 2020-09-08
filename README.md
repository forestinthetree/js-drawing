# Canvas library comparison

An exploration of different canvas libraries.

The comparison contains:

- [Paper.js](http://paperjs.org/)
- [PixiJS](https://www.pixijs.com/)

## Development

- Install [nvm](https://github.com/creationix/nvm)
- Use correct node version

        nvm use

- Install dependencies in this folder

        npm install

- Run with `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.<br>
  You will also see any lint errors in the console.

## Design decisions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), however it aims to use the libraries in their most native form, so they are included in `index.html` from a CDN, and the drawing code is imported outside of React rendering.

Create React App is used only as a simple way to get it building in a modern JavaScript environment.
