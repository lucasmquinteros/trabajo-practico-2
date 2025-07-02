import createHeader from "../view/header.js";
import {getLocations} from "../models/location.model.js";
import {renderLocations} from "../view/locations.view.js";
import "../../styles/locations.css"

createHeader();
const locations = await getLocations();
console.log(locations);
renderLocations(locations);
