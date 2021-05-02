"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = exports.Path = void 0;

/*========================================
Exportamos la ruta para tómar imágenes
==========================================*/
var Path = {
  url: 'http://localhost:4200/assets/'
};
/*========================================
Exportamos el endPoint de la APIREST de Firebase
==========================================*/

exports.Path = Path;
var Api = {
  url: 'https://estudio-8f948-default-rtdb.firebaseio.com/'
};
exports.Api = Api;