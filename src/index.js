import { getUrlParameters } from "./utils/get-url-parameters";
import "./index.css";

function redirectToHomeLink() {
  const [homeLink] = document.querySelectorAll("nav a[data-is-home]");
  if (homeLink) {
    const href = homeLink.getAttribute("href");
    window.location.replace(href);
  }
}

function main() {
  const { lib } = getUrlParameters(window.location.href);
  if (lib === "paperjs") {
    require("./paperjs/draw");
  } else if (lib === "pixijs") {
    require("./pixijs/draw");
  } else if (lib === "ptsjs") {
    require("./ptsjs");
  } else if (lib === "twojs") {
    require("./twojs/draw");
  } else {
    redirectToHomeLink();
  }
}

main();
