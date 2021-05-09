"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BestSalesItemsComponent = void 0;
var core_1 = require("@angular/core");
var funtions_js_1 = require("../../../funtions.js");
var config_1 = require("../../../config");
var BestSalesItemsComponent = /** @class */ (function () {
    function BestSalesItemsComponent(productsService, activatedRoute) {
        this.productsService = productsService;
        this.activatedRoute = activatedRoute;
        this.path = config_1.Path.url;
        this.bestSalesItem = [];
        this.render = true;
        this.rating = [];
        this.reviews = [];
        this.price = [];
        this.cargando = false;
        this.params = null;
    }
    BestSalesItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        /*======================================
     Capturamos el parámetro URL
     ========================================*/
        this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];
        /*======================================
        Filtramos data de prouctos con categorías
        ========================================*/
        this.productsService.getFilterData("category", this.params)
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
                _this.productsService.getFilterData("sub_category", _this.params)
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
            Declaramos función para mostrar las mejores ventas
       =================================================================*/
    BestSalesItemsComponent.prototype.productsFnc = function (response) {
        var _this = this;
        this.bestSalesItem = [];
        /*================================================================
                Hacemos un recorrido por la respuesta que nos traiga el filtrado
           =================================================================*/
        var i;
        var getSales = [];
        for (i in response) {
            getSales.push(response[i]);
        }
        /*=============================================
            Ordenamos de mayor a menor ventas el arreglo de objetos
            =============================================*/
        getSales.sort(function (a, b) {
            return (b.sales - a.sales);
        });
        /*================================================================
         Filtramos solo hasta 10 productos
    =================================================================*/
        getSales.forEach(function (product, index) {
            if (index < 10) {
                _this.bestSalesItem.push(product);
                _this.rating.push(funtions_js_1.DinamicRating.fnc(_this.bestSalesItem[index]));
                _this.reviews.push(funtions_js_1.DinamicReviews.fnc(_this.rating[index]));
                _this.price.push(funtions_js_1.DinamicPrice.fnc(_this.bestSalesItem[index]));
                _this.cargando = false;
            }
        });
    };
    /*=============================================
      Función que nos avisa cuando finaliza el renderizado de Angular
      =============================================*/
    BestSalesItemsComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funtions_js_1.OwlCarouselConfig.fnc();
            funtions_js_1.CarouselNavigation.fnc();
            funtions_js_1.Rating.fnc();
        }
    };
    BestSalesItemsComponent = __decorate([
        core_1.Component({
            selector: 'app-best-sales-items',
            templateUrl: './best-sales-items.component.html',
            styleUrls: ['./best-sales-items.component.css']
        })
    ], BestSalesItemsComponent);
    return BestSalesItemsComponent;
}());
exports.BestSalesItemsComponent = BestSalesItemsComponent;
