"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsShowcaseComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var funtions_js_1 = require("../../../funtions.js");
var ProductsShowcaseComponent = /** @class */ (function () {
    function ProductsShowcaseComponent(productsService, activateRoute) {
        this.productsService = productsService;
        this.activateRoute = activateRoute;
        this.path = config_1.Path.url;
        this.products = [];
        this.render = true;
        this.cargando = false;
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.params = null;
        this.productFound = 0;
        this.currentRoute = null;
        this.totalPage = 0;
        this.sortItems = [];
        this.sortValues = [];
    }
    ProductsShowcaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*=============================================
      Capturamos el parámetro URL
      =============================================*/
        this.params = this.activateRoute.snapshot.params["param"].split("&")[0];
        this.sort = this.activateRoute.snapshot.params["param"].split("&")[1];
        this.page = this.activateRoute.snapshot.params["param"].split("&")[2];
        /*=============================================
        Evaluamos que el segundo parámetro sea de paginación
        =============================================*/
        if (Number.isInteger(Number(this.sort))) {
            this.page = this.sort;
            this.sort = undefined;
        }
        /*=============================================
        Evaluamos que el parámetro de orden no esté definido
        =============================================*/
        if (this.sort == undefined) {
            this.currentRoute = "products/" + this.params;
        }
        else {
            this.currentRoute = "products/" + this.params + "&" + this.sort;
        }
        /*=============================================
        Filtramos data de productos con categorías
        =============================================*/
        this.productsService.getFilterData("category", this.params)
            .subscribe(function (resp1) {
            if (Object.keys(resp1).length > 0) {
                _this.productsFnc(resp1);
            }
            else {
                /*=============================================
                Filtramos data de subategorías
                =============================================*/
                _this.productsService.getFilterData("sub_category", _this.params)
                    .subscribe(function (resp2) {
                    _this.productsFnc(resp2);
                });
            }
        });
    };
    /*=============================================
  Declaramos función para mostrar el catálogo de productos
  =============================================*/
    ProductsShowcaseComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.products = [];
        /*=============================================
      Hacemos un recorrido por la respuesta que nos traiga el filtrado
      =============================================*/
        var i;
        var getProducts = [];
        var total = 0;
        for (i in response) {
            total++;
            getProducts.push(response[i]);
        }
        /*=============================================
        Definimos el total de productos y la paginación de productos
        =============================================*/
        this.productFound = total;
        this.totalPage = Math.ceil(Number(this.productFound) / 6);
        /*=============================================
        Ordenamos el arreglo de objetos lo mas actual a lo más antiguo
        =============================================*/
        if (this.sort == undefined || this.sort == "fisrt") {
            getProducts.sort(function (a, b) {
                return (b.date_created - a.date_created);
            });
            this.sortItems = [
                "Sort by first",
                "Sort by latest",
                "Sort by popularity",
                "Sort by price: low to high",
                "Sort by price: high to low"
            ];
            this.sortValues = [
                "first",
                "latest",
                "popularity",
                "low",
                "high"
            ];
        }
        /*=============================================
        Ordenamos el arreglo de objetos lo mas antiguo a lo más actual
        =============================================*/
        if (this.sort == "latest") {
            getProducts.sort(function (a, b) {
                return (a.date_created - b.date_created);
            });
            this.sortItems = [
                "Sort by latest",
                "Sort by first",
                "Sort by popularity",
                "Sort by price: low to high",
                "Sort by price: high to low"
            ];
            this.sortValues = [
                "latest",
                "first",
                "popularity",
                "low",
                "high"
            ];
        }
        /*=============================================
        Ordenamos el arreglo de objetos lo mas visto
        =============================================*/
        if (this.sort == "popularity") {
            getProducts.sort(function (a, b) {
                return (b.views - a.views);
            });
            this.sortItems = [
                "Sort by popularity",
                "Sort by first",
                "Sort by latest",
                "Sort by price: low to high",
                "Sort by price: high to low"
            ];
            this.sortValues = [
                "popularity",
                "first",
                "latest",
                "low",
                "high"
            ];
        }
        /*=============================================
        Ordenamos el arreglo de objetos de menor a mayor precio
        =============================================*/
        if (this.sort == "low") {
            getProducts.sort(function (a, b) {
                return (a.price - b.price);
            });
            this.sortItems = [
                "Sort by price: low to high",
                "Sort by first",
                "Sort by latest",
                "Sort by popularity",
                "Sort by price: high to low"
            ];
            this.sortValues = [
                "low",
                "first",
                "latest",
                "popularity",
                "high"
            ];
        }
        /*=============================================
        Ordenamos el arreglo de objetos de mayor a menor precio
        =============================================*/
        if (this.sort == "high") {
            getProducts.sort(function (a, b) {
                return (b.price - a.price);
            });
            this.sortItems = [
                "Sort by price: high to low",
                "Sort by first",
                "Sort by latest",
                "Sort by popularity",
                "Sort by price: low to high"
            ];
            this.sortValues = [
                "high",
                "first",
                "latest",
                "popularity",
                "low"
            ];
        }
        /*=============================================
        Filtramos solo hasta 10 productos
        =============================================*/
        getProducts.forEach(function (product, index) {
            /*=============================================
            Evaluamos si viene número de página definida
            =============================================*/
            if (_this.page == undefined) {
                _this.page = 1;
            }
            /*=============================================
            Configuramos la paginación desde - hasta
            =============================================*/
            var first = Number(index) + (_this.page * 6) - 6;
            var last = 6 * _this.page;
            /*=============================================
            Filtramos los productos a mostrar
            =============================================*/
            if (first < last) {
                if (getProducts[first] != undefined) {
                    _this.products.push(getProducts[first]);
                    _this.rating.push(funtions_js_1.DinamicRating.fnc(getProducts[first]));
                    _this.reviews.push(funtions_js_1.DinamicReviews.fnc(_this.rating[index]));
                    _this.price.push(funtions_js_1.DinamicPrice.fnc(getProducts[first]));
                    _this.cargando = false;
                }
            }
        });
    };
    /*=============================================
  Función que nos avisa cuando finaliza el renderizado de Angular
  =============================================*/
    ProductsShowcaseComponent.prototype.callback = function (params) {
        if (this.render) {
            this.render = false;
            funtions_js_1.Rating.fnc();
            funtions_js_1.Pagination.fnc();
            //  Select2Cofig.fnc();
            //   Tabs.fnc();
            /*=============================================
          Captura del Select Sort Items
          =============================================*/
            $(".sortItems").change(function () {
                window.open("products/" + params + "&" + $(this).val(), '_top');
            });
        }
    };
    ProductsShowcaseComponent = __decorate([
        core_1.Component({
            selector: 'app-products-showcase',
            templateUrl: './products-showcase.component.html',
            styleUrls: ['./products-showcase.component.css']
        })
    ], ProductsShowcaseComponent);
    return ProductsShowcaseComponent;
}());
exports.ProductsShowcaseComponent = ProductsShowcaseComponent;
