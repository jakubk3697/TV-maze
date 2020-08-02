import { getShowByKey } from "./requests.js";
import { getShowById } from "./requests.js";
import { mapListToDOMElements } from "./DOMInteractions.js";

console.log();

class TvMaze {
  constructor() {
    this.viewElems = {};
    this.showNameButtons = {};
    this.selectedName = "harry";
    this.initializeApp();
  }
  initializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
  };

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll("[id]")).map((el) => el.id);
    const listOfShowNames = Array.from(document.querySelectorAll("[data-show-name]")).map((el) => el.dataset.showName);

    this.viewElems = mapListToDOMElements(listOfIds, "id");
    this.showNameButtons = mapListToDOMElements(listOfShowNames, "data-show-name");
  };

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach((showName) => {
      this.showNameButtons[showName].addEventListener("click", this.setCurrentNameFilter);
    });
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
    console.log(this.selectedName);
  };
}

document.addEventListener("DOMContentLoaded", new TvMaze());
