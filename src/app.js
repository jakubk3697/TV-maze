import { getShowsByKey } from "./requests.js";
import { getShowById } from "./requests.js";
import { mapListToDOMElements, createDOMElem } from "./DOMInteractions.js";

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
    // this.fetchAndDisplayShows();
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
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    getShowsByKey(this.selectedName).then((shows) => this.renderCards(shows));
  };

  renderCards = (shows) => {
    this.viewElems.showsWrapper.innerHTML = "";
    for (const { show } of shows) {
      this.createShowCard(show);
      console.log(show);
    }
  };

  createShowCard = (show) => {
    const divCard = createDOMElem("div", "card");
    const divCardBody = createDOMElem("div", "card-body");
    const h5 = createDOMElem("h5", "card-title", show.name);
    console.log(h5);
    const btn = createDOMElem("button", "btn btn-primary", "Show details");
    let img;
    let p;

    if (show.image) {
      img = createDOMElem("img", "card-img-top", null, show.image.medium);
    } else {
      img = createDOMElem("img", "card-img-top", null, "https://via.placeholder.com/210x295");
    }

    if (show.summary) {
      p = createDOMElem("p", "card-text", `${show.summary.slice(0,80)}...`);
    } else {
      p = createDOMElem("p", "card-text", "There is no summary for that show yet.");
    }

    divCard.append(divCardBody);

    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    this.viewElems.showsWrapper.appendChild(divCard);
  };
}

//   <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src=".../100px180/" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
//  </div>

document.addEventListener("DOMContentLoaded", new TvMaze());
