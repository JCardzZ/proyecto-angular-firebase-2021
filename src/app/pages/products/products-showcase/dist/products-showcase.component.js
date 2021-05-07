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
    function ProductsShowcaseComponent(productsService, activatedRoute) {
        this.productsService = productsService;
        this.activatedRoute = activatedRoute;
        this.path = config_1.Path.url;
        this.products = [];
        this.render = true;
        this.cargando = false;
        this.rating = [];
        this.reviews = [];
        this.price = [];
    }
    ProductsShowcaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*======================================
     Capturamos el parámetro URL
     ========================================*/
        var params = this.activatedRoute.snapshot.params["param"];
        this.productsService.getFilterData("category", params)
            .subscribe(function (resp1) {
            if (Object.keys(resp1).length > 0) {
                var i = void 0;
                for (i in resp1) {
                    _this.productsFnc(resp1);
                }
            }
            else {
                /*================================================================
                        Filtramos data de las Subcategorias
                   =================================================================*/
                _this.productsService.getFilterData("sub_category", params)
                    .subscribe(function (resp2) {
                    var i;
                    for (i in resp2) {
                        _this.productsFnc(resp2);
                    }
                });
            }
        });
    };
    /*================================================================
          Declaramos función para las mostrar los productos recomendados
       =================================================================*/
    ProductsShowcaseComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.products = [];
        /*================================================================
                Hacemos un recorrido por la respuesta que nos traiga el filtrado
           =================================================================*/
        var i;
        var getProducts = [];
        for (i in response) {
            getProducts.push(response[i]);
        }
        /*================================================================
                Filtramos solo hasta 6 productos
           =================================================================*/
        getProducts.forEach(function (product, index) {
            if (index < 6) {
                _this.products.push(product);
                _this.rating.push(funtions_js_1.DinamicRating.fnc(_this.products[index]));
                _this.reviews.push(funtions_js_1.DinamicReviews.fnc(_this.rating[index]));
                _this.price.push(funtions_js_1.DinamicPrice.fnc(_this.products[index]));
                _this.cargando = false;
            }
        });
    };
    /*=============================================
      Función que nos avisa cuando finaliza el renderizado de Angular
      =============================================*/
    ProductsShowcaseComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funtions_js_1.Rating.fnc();
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
