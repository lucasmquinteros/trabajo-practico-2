# Api and Morty

## Descripción

Rick and Morty Explorer es una aplicación web que permite explorar información sobre personajes, episodios y ubicaciones de la serie Rick and Morty. La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/) para obtener datos actualizados y ofrece una interfaz interactiva para navegar por el universo de la serie.

## Características

- **Exploración de personajes**: Visualiza todos los personajes de la serie con sus detalles.
- **Filtrado avanzado**: Filtra personajes por nombre, especie y estado (vivo, muerto, desconocido).
- **Detalles de personajes**: Accede a información detallada de cada personaje, incluyendo su origen, ubicación actual y episodios en los que aparece.
- **Exploración de episodios**: Visualiza todos los episodios de la serie con sus detalles.
- **Detalles de episodios**: Accede a información detallada de cada episodio, incluyendo los personajes que aparecen en él.
- **Exploración de ubicaciones**: Visualiza todas las ubicaciones del universo de Rick and Morty.
- **Detalles de ubicaciones**: Accede a información detallada de cada ubicación, incluyendo los residentes.
- **Indicador de carga**: Muestra un indicador visual durante las peticiones a la API para mejorar la experiencia de usuario.

## Tecnologías utilizadas

- **HTML5**: Estructura de la aplicación.
- **CSS3**: Estilos y diseño responsive.
- **JavaScript (ES6+)**: Lógica de la aplicación y manipulación del DOM.
- **Vite**: Entorno de desarrollo y construcción.
- **Fetch API**: Consumo de la API de Rick and Morty.
- **Vercel**: Despliegue y hosting de la aplicación.

## Arquitectura

La aplicación sigue un patrón de arquitectura MVC (Modelo-Vista-Controlador):

- **Modelo**: Encargado de la comunicación con la API y el manejo de datos.

  - `character.model.js`: Funciones para obtener datos de personajes.
  - `episode.model.js`: Funciones para obtener datos de episodios.
  - `location.model.js`: Funciones para obtener datos de ubicaciones.

- **Vista**: Encargada de la representación visual de los datos.

  - `character.view.js`: Renderizado de personajes.
  - `episodes.view.js`: Renderizado de episodios.
  - `locations.view.js`: Renderizado de ubicaciones.
  - `header.js`: Creación del encabezado común.

- **Controlador**: Encargado de la lógica de negocio y la comunicación entre el modelo y la vista.

  - `characters.controller.js`: Control de la página de personajes.
  - `character.controller.js`: Control de la página de detalle de personaje.
  - `episodes.controller.js`: Control de la página de episodios.
  - `episode.controller.js`: Control de la página de detalle de episodio.
  - `locations.controller.js`: Control de la página de ubicaciones.
  - `location.controller.js`: Control de la página de detalle de ubicación.

- **Estado global**: Gestión del estado compartido de la aplicación.

  - `state.js`: Almacenamiento de datos compartidos y utilidades comunes.

- **Utilidades**: Funciones de ayuda y mejoras de experiencia de usuario.
  - `fetchWithLoader.js`: Interceptor de peticiones fetch para mostrar/ocultar el loader automáticamente.
  - `IndexDocument.js`: Inicialización de la página principal.

## Estructura de archivos

```
├── public/
│   └── icons8-rick-sanchez.svg
├── src/
│   ├── main.js
│   ├── pages/
│   │   ├── character.html
│   │   ├── episode.html
│   │   ├── episodes.html
│   │   ├── location.html
│   │   └── locations.html
│   ├── scripts/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── store/
│   │   ├── utils/
│   │   └── view/
│   └── styles/
│       ├── character.css
│       ├── episode.css
│       ├── episodes.css
│       ├── header.css
│       ├── loader.css
│       ├── location.css
│       ├── locations.css
│       ├── root.css
│       └── style.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```
##Detalles
Me hubiese gustado agregar funcionalidades locales, es decir al hacer el fetch a todos los personajes/episodios/localizaciones guardarlos en state y luego manipular la informacion desde state. O quizas poder filtrar dentro de un personaje, o episodio que los inputs funcionen allí.