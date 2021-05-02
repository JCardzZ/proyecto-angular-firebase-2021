"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeShowcaseComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var funtions_1 = require("../../../funtions");
var HomeShowcaseComponent = /** @class */ (function () {
    function HomeShowcaseComponent(categoriesService, subCategoriesService, productsService) {
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.productsService = productsService;
        this.path = config_1.Path.url;
        this.categories = [];
        this.cargando = false;
        this.render = true;
    }
    HomeShowcaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*=================================
        Tomamos la data de las categorias
        ====================================*/
        var getCategories = [];
        this.categoriesService.getData().subscribe(function (resp) {
            var i;
            for (i in resp) {
                getCategories.push(resp[i]);
            }
            /*=====================================================
          Ordenamos de mayor a menor vistas el arreglo de objetos
          =======================================================*/
            getCategories.sort(function (a, b) {
                return b.view - a.view;
            });
            /*=====================================================
          Filtramos hasta 6 categories
          =======================================================*/
            getCategories.forEach(function (category, index) {
                if (index < 6) {
                    _this.categories[index] = getCategories[index];
                    _this.cargando = false;
                }
            });
        });
    };
    /*================================================================
      Función que nos avisa cuando finaliza el renderizado de Angular
      ===============================================================*/
    HomeShowcaseComponent.prototype.callback = function () {
        var _this = this;
        if (this.render) {
            this.render = false;
            var arraySubCategories_1 = [];
            var arrayProducts_1 = [];
            /*================================================================
          Separar las categorias
        ===============================================================*/
            this.categories.forEach(function (category) {
                /*==================================================================================
                Tomamos la colección de las sub-categorias filtrando con los nombres de las categorias
              =====================================================================================*/
                _this.subCategoriesService.getFilterData("category", category.name)
                    .subscribe(function (resp) {
                    var i;
                    for (i in resp) {
                        arraySubCategories_1.push({
                            "category": resp[i].category,
                            "subcategory": resp[i].name,
                            "url": resp[i].url
                        });
                    }
                    /*=============================================================================================
                    Recorremos el array de objetso nuevo para buscar coincidencias con los nombres de las categorias
                  =================================================================================================*/
                    for (i in arraySubCategories_1) {
                        if (category.name == arraySubCategories_1[i].category) {
                            $("[category-showcase='" + category.name + "']").append("\n\n          <li><a href=\"products/" + arraySubCategories_1[i].url + "\">" + arraySubCategories_1[i].subcategory + "</a></li>\n          ");
                        }
                    }
                });
                /*==================================================================================
                Tomamos la colección de los productos filtrando con las url's de categorias
              =====================================================================================*/
                _this.productsService.getFilterDataWithLimit("category", category.url, 6)
                    .subscribe(function (resp) {
                    var i;
                    for (i in resp) {
                        arrayProducts_1.push({
                            "category": resp[i].category,
                            "url": resp[i].url,
                            "name": resp[i].name,
                            "image": resp[i].image,
                            "price": resp[i].price,
                            "offer": resp[i].offer,
                            "reviews": resp[i].reviews,
                            "stock": resp[i].stock,
                            "vertical_slider": resp[i].vertical_slider
                        });
                    }
                    /*======================================================================================
                      Recorremos el array de objetos nuevo para buscar coincidencias con las url de categorias
                    =========================================================================================*/
                    for (i in arrayProducts_1) {
                        if (category.url == arrayProducts_1[i].category) {
                            /*=============================================
                          Definimos si el precio del producto tiene oferta o no
                          =============================================*/
                            var price = void 0;
                            var type = void 0;
                            var value = void 0;
                            var offer = void 0;
                            var disccount = void 0;
                            if (arrayProducts_1[i].offer != "") {
                                type = JSON.parse(arrayProducts_1[i].offer)[0];
                                value = JSON.parse(arrayProducts_1[i].offer)[1];
                                if (arrayProducts_1[i].offer != "") {
                                    type = JSON.parse(arrayProducts_1[i].offer)[0];
                                    value = JSON.parse(arrayProducts_1[i].offer)[1];
                                    if (type == "Disccount") {
                                        offer = (arrayProducts_1[i].price - (arrayProducts_1[i].price * value / 100)).toFixed(2);
                                    }
                                    if (type == "Fixed") {
                                        offer = value;
                                        value = Math.round(offer * 100 / arrayProducts_1[i].price);
                                    }
                                    disccount = "<div class=\"ps-product__badge\">-" + value + "%</div>";
                                    price = "<p class=\"ps-product__price sale\">$" + offer + " <del>$" + arrayProducts_1[i].price + " </del></p>";
                                }
                                else {
                                    price = "<p class=\"ps-product__price\">$" + arrayProducts_1[i].price + " </p>";
                                }
                                /*=============================================
                              Calculamos el total de calificaciones de las reseñas
                              =============================================*/
                                var totalReview = 0;
                                for (var f = 0; f < JSON.parse(arrayProducts_1[i].reviews).length; f++) {
                                    totalReview += Number(JSON.parse(arrayProducts_1[i].reviews)[f]["review"]);
                                }
                                /*=======================================================
                              Imprimimos el total de las calificaciones para cada producto
                              ===========================================================*/
                                var rating = Math.round(totalReview / JSON.parse(arrayProducts_1[i].reviews).length);
                                /*=============================================
                                Definimos si el producto tiene stock
                                =============================================*/
                                if (arrayProducts_1[i].stock == 0) {
                                    disccount = "<div class=\"ps-product__badge out-stock\">Out Of Stock</div>";
                                }
                                /*=============================================
                                Imprimimos los productos en el HTML
                                =============================================*/
                                $("[category-pb='" + arrayProducts_1[i].category + "']").append("\n                <div class=\"ps-product ps-product--simple\">\n\n                    <div class=\"ps-product__thumbnail\">\n\n                        <a href=\"product/" + arrayProducts_1[i].url + "\">\n\n                            <img src=\"assets/img/products/" + arrayProducts_1[i].category + "/" + arrayProducts_1[i].image + "\" alt=\"\">\n\n                        </a>\n\n                        " + disccount + "\n\n                    </div>\n\n                    <div class=\"ps-product__container\">\n\n                        <div class=\"ps-product__content\" data-mh=\"clothing\">\n\n                            <a class=\"ps-product__title\" href=\"product/" + arrayProducts_1[i].url + "\">" + arrayProducts_1[i].name + "</a>\n\n                            <div class=\"ps-product__rating\">\n\n                                <select class=\"ps-rating productRating\" data-read-only=\"true\">\n\n\n                                </select>\n\n                                <span>" + rating + "</span>\n\n                            </div>\n\n                            " + price + "\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>");
                                /*================================================================
                                 Clasificamos la cantidad de estrellas según la clasificación
                                =================================================================*/
                                var arrayRating = $(".productRating");
                                for (var i_1 = 0; i_1 < arrayRating.length; i_1++) {
                                    for (var f = 1; f <= 5; f++) {
                                        $(arrayRating[i_1]).append("<option value=\"2\">" + f + "</option");
                                        if (rating == f) {
                                            $(arrayRating[i_1]).children('option').val(1);
                                        }
                                    }
                                }
                                /*================================================================
                               Ejecutar funciones globales con respecto a las Reseñas
                              =================================================================*/
                                funtions_1.Rating.fnc();
                            }
                        }
                    }
                });
            });
        }
    };
    HomeShowcaseComponent = __decorate([
        core_1.Component({
            selector: 'app-home-showcase',
            templateUrl: './home-showcase.component.html',
            styleUrls: ['./home-showcase.component.css']
        })
    ], HomeShowcaseComponent);
    return HomeShowcaseComponent;
}());
exports.HomeShowcaseComponent = HomeShowcaseComponent;
