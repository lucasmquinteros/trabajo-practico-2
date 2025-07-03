/**
 * Módulo principal para la inicialización de la página de inicio
 * Configura los componentes necesarios y establece los listeners de eventos
 */

import createHeader from "../view/header.js";
import * as controllers from "../controllers/characters.controller.js"
import {setupFilterListeners} from "../controllers/setupFilterListener.js";
import optionsView from "../view/options.view.js";
import setupFetchInterceptor from "./fetchWithLoader.js";

/**
 * Función principal que inicializa la página de inicio
 * Configura los listeners de eventos y carga los datos iniciales
 * @returns {void}
 */
const pageIndex = () => {
    document.addEventListener("DOMContentLoaded", () => {
        // Configurar el interceptor de fetch para mostrar/ocultar el loader automáticamente
        setupFetchInterceptor();
        
        // Inicializar la interfaz
        createHeader();
        optionsView()
        controllers.initCharacters().catch(console.error)
        setupFilterListeners();
    });
}
export default pageIndex;