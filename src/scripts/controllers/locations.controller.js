/**
 * Controlador para la página de listado de ubicaciones
 * Se encarga de obtener los datos y pasarlos a la vista
 */

import createHeader from "../view/header.js";
import { getLocations } from "../models/location.model.js";
import { renderLocations } from "../view/locations.view.js";
import "../../styles/locations.css";
import state from "../store/state.js";

// Obtiene todas las ubicaciones de la API
const locations = await getLocations();
state.locations = locations;
// Renderiza las ubicaciones en la interfaz
renderLocations(state.locations);

// Inicializa la página creando el encabezado
createHeader();
