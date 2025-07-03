/**
 * Controlador para la página de listado de ubicaciones
 * Se encarga de obtener los datos y pasarlos a la vista
 */

import createHeader from "../view/header.js";
import {getLocations} from "../models/location.model.js";
import {renderLocations} from "../view/locations.view.js";
import "../../styles/locations.css"

// Inicializa la página creando el encabezado
createHeader();

// Obtiene todas las ubicaciones de la API
const locations = await getLocations();

// Renderiza las ubicaciones en la interfaz
renderLocations(locations);
