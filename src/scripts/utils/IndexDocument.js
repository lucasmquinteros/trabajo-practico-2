import createHeader from "../view/header.js";
import * as controllers from "../controllers/characters.controller.js"
import {setupFilterListeners} from "../controllers/setupFilterListener.js";
import optionsView from "../view/options.view.js";

const pageIndex = () => {
    document.addEventListener("DOMContentLoaded", () => {
        createHeader();
        optionsView()
        controllers.initCharacters().catch(console.error)
        setupFilterListeners();
    });
}
export default pageIndex;