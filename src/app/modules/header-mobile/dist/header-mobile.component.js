"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderMobileComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../config");
//import { Search } from '../../functions';
var funtions_1 = require("../../funtions");
var HeaderMobileComponent = /** @class */ (function () {
    function HeaderMobileComponent(categoriesService, subCategoriesService) {
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.path = config_1.Path.url;
        this.categories = null;
        this.render = true;
        this.categoriesList = [];
    }
    HeaderMobileComponent.prototype.ngOnInit = function () {
        /*======================================
        Tomamos  la data de las categorias
        ========================================*/
        var _this = this;
        this.categoriesService.getData().subscribe(function (resp) {
            _this.categories = resp;
            /*======================================
          Recorrido por el objeto de la data de categorias
          ========================================*/
            var i;
            for (i in resp) {
                /*======================================
            Separamos los nombre de categorias
            ========================================*/
                _this.categoriesList.push(resp[i].name);
            }
            //   console.log('this.categories', this.categories);
        });
        /*======================================
       Activamos el efecto toogle en el listado  de subcategorias
        ========================================*/
        $(document).on('click', '.sub-toggle', function () {
            $(this).parent().children('ul').toggle();
        });
    };
    /*======================================
      Declaramos función del buscador
  ========================================*/
    HeaderMobileComponent.prototype.goSearch = function (search) {
        if (search.length == 0 || funtions_1.Search.fnc(search) == undefined) {
            return;
        }
        window.open("search/" + funtions_1.Search.fnc(search), '_top');
    };
    /*======================================
     Función que nos avisa cuando finaliza el renderizado de Angular
      ========================================*/
    HeaderMobileComponent.prototype.callback = function () {
        var _this = this;
        if (this.render) {
            this.render = false;
            var arraySubCategories_1 = [];
            /*======================================
              Separar las categorias
         ========================================*/
            this.categoriesList.forEach(function (category) {
                /*=====================================================================================
           Tomamos la coleccion de las sub-categorias filtrando con los nombres de las categorias
           =======================================================================================*/
                _this.subCategoriesService
                    .getFilterData('category', category)
                    .subscribe(function (resp) {
                    /*========================================================================================================================
           Hacemos un recorrido por la colección general de subcategorias y clasificamos de acuerdo a la categoria que correspondan
           =========================================================================================================================*/
                    var i;
                    for (i in resp) {
                        arraySubCategories_1.push({
                            category: resp[i].category,
                            subcategory: resp[i].name,
                            url: resp[i].url
                        });
                    }
                    /*=====================================================================================
                Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
                =======================================================================================*/
                    for (i in arraySubCategories_1) {
                        if (category == arraySubCategories_1[i].category) {
                            $("[category='" + category + "']").append("<li class=\"current-menu-item \">\n        <a href=\"products/" + arraySubCategories_1[i].url + "\">" + arraySubCategories_1[i].subcategory + "</a>\n        </li>");
                        }
                    }
                });
            });
        }
    };
    HeaderMobileComponent = __decorate([
        core_1.Component({
            selector: 'app-header-mobile',
            templateUrl: './header-mobile.component.html',
            styleUrls: ['./header-mobile.component.css']
        })
    ], HeaderMobileComponent);
    return HeaderMobileComponent;
}());
exports.HeaderMobileComponent = HeaderMobileComponent;
