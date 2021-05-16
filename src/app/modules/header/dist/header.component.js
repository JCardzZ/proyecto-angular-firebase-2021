"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../config");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(categoriesService, subCategoriesService) {
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.path = config_1.Path.url;
        this.categories = null;
        this.arrayTitleList = [];
        this.render = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        /*======================================
        Tomamos  la data de las categorias
        ========================================*/
        var _this = this;
        this.categoriesService.getData().subscribe(function (resp) {
            _this.categories = resp;
            //  console.log("resp", resp);
            /*======================================
          Recorremos la colección de categorías para tomar la lista de titulos
          ========================================*/
            var i;
            for (i in resp) {
                //console.log("resp", resp[i].title_list);
                _this.arrayTitleList.push(JSON.parse(resp[i].title_list));
                //  console.log('this.arrayTitleList', this.arrayTitleList);
            }
        });
    };
    /*======================================
      Función que nos avisa cuando finaliza el renderizado de Angular
  ========================================*/
    HeaderComponent.prototype.callback = function () {
        var _this = this;
        if (this.render) {
            this.render = false;
            var arraySubCategories_1 = [];
            //   console.log("this.render", this.render);
            /*======================================
          Hacemos un recorrido por la lista de titulos
      ========================================*/
            this.arrayTitleList.forEach(function (titleList) {
                /*======================================
            Separar individualmente los titulos
        ========================================*/
                var _loop_1 = function (i) {
                    /*============================================================================
             Tomamos la colección de las sub-categories filtrando con la lista de titulos
          ==============================================================================*/
                    _this.subCategoriesService
                        .getFilterData('title_list', titleList[i])
                        .subscribe(function (resp) {
                        arraySubCategories_1.push(resp);
                        /*===========================================================
            Hacemos un recorrido por la coleccion general de subcategorias
          ================================================================*/
                        var f;
                        var g;
                        var arrayTitleName = [];
                        for (f in arraySubCategories_1) {
                            /*===========================================================
              Hacemos un recorrido por la coleccion particular de subcategorias
            ================================================================*/
                            for (g in arraySubCategories_1[f]) {
                                /*==============================================================================================
                Creamos un nuevo array de objetos clasificando cada sub-categoria con la respectiva lista de titulos
              ====================================================================================================*/
                                arrayTitleName.push({
                                    titleList: arraySubCategories_1[f][g].title_list,
                                    subcategory: arraySubCategories_1[f][g].name,
                                    "url": arraySubCategories_1[f][g].url
                                });
                            }
                            //console.log("arraySubCategories", arraySubCategories[f]);
                        }
                        /*=======================================================================================
                        Recorremos el array de objetos nuevo para buscar coincidencias con las listas de titulo
                        =========================================================================================*/
                        for (f in arrayTitleName) {
                            if (titleList[i] == arrayTitleName[f].titleList) {
                                //console.log("arrayTitleName[f].subcategory", arrayTitleName[f].subcategory);
                                //console.log("titleList[i]", titleList[i]);
                                /*=======================================================================================
                                Imprimir el nombre de subcategoria debajo de el listado correspondiente
                                =========================================================================================*/
                                $("[titleList='" + titleList[i] + "']").append("<li>\n                <a href=\"products/" + arrayTitleName[f].url + "\">" + arrayTitleName[f].subcategory + "</a>\n                </li>");
                            }
                        }
                        //  console.log("arrayTitleName", arrayTitleName);
                        //console.log('resp', resp);
                    });
                };
                //  console.log('titleList', titleList);
                for (var i = 0; i < titleList.length; i++) {
                    _loop_1(i);
                }
            });
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
