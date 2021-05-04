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
var funtions_1 = require("../../../funtions");
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
    }
    BestSalesItemsComponent.prototype.ngOnInit = function () {
        /*======================================
     Capturamos el parámetro URL
     ========================================*/
        var _this = this;
        var params = this.activatedRoute.snapshot.params["param"];
        /*======================================
        Filtramos data de prouctos con categorías
        ========================================*/
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
                _this.rating.push(_this.dinamicRating(_this.bestSalesItem[index]));
                _this.reviews.push(_this.dinamicReviews(_this.rating[index]));
                _this.price.push(_this.dinamicPrice(_this.bestSalesItem[index]));
            }
        });
    };
    /*=============================================
      Función para el Rating dinámico
      =============================================*/
    BestSalesItemsComponent.prototype.dinamicRating = function (response) {
        /*=============================================
          Calculamos el total de las calificaciones  de las reseñas
          =============================================*/
        var totalReview = 0;
        var rating = 0;
        for (var i = 0; i < JSON.parse(response.reviews).length; i++) {
            totalReview += Number(JSON.parse(response.reviews)[i]["review"]);
        }
        rating = Math.round(totalReview / JSON.parse(response.reviews).length);
        return rating;
    };
    /*=============================================
      Función para las reseñas dinámicas
      =============================================*/
    BestSalesItemsComponent.prototype.dinamicReviews = function (response) {
        /*=============================================
        Clasificamos la cantidad de estrellas según la calificación
        =============================================*/
        var reviews = [];
        for (var r = 0; r < 5; r++) {
            if (response < (r + 1)) {
                reviews[r] = 2;
            }
            else {
                reviews[r] = 1;
            }
        }
        console.log("reviews", reviews);
        return reviews;
    };
    /*=============================================
  Función para los precios dinámicos
  =============================================*/
    BestSalesItemsComponent.prototype.dinamicPrice = function (response) {
        var type;
        var value;
        var offer;
        var price;
        var disccount;
        var arrayPrice = [];
        var offerDate;
        var today = new Date();
        if (response.offer != "") {
            offerDate = new Date(parseInt(JSON.parse(response.offer)[2].split("-")[0]), parseInt(JSON.parse(response.offer)[2].split("-")[1]) - 1, parseInt(JSON.parse(response.offer)[2].split("-")[2]));
            if (today < offerDate) {
                type = JSON.parse(response.offer)[0];
                value = JSON.parse(response.offer)[1];
                if (type == "Disccount") {
                    offer = (response.price - (response.price * value / 100)).toFixed(2);
                }
                if (type == "Fixed") {
                    offer = value;
                    value = Math.round(offer * 100 / response.price);
                }
                disccount = "<div class=\"ps-product__badge\">-" + value + "%</div>";
                price = "<p class=\"ps-product__price sale\">$<span class=\"end-price\">" + offer + "</span> <del>$" + response.price + " </del></p>";
            }
            else {
                price = "<p class=\"ps-product__price\">$<span class=\"end-price\">" + response.price + "</span></p>";
            }
        }
        else {
            price = "<p class=\"ps-product__price\">$<span class=\"end-price\">" + response.price + "</span></p>";
        }
        /*=============================================
        Definimos si el producto tiene stock
        =============================================*/
        if (response.stock == 0) {
            disccount = "<div class=\"ps-product__badge out-stock\">Out Of Stock</div>";
        }
        arrayPrice[0] = price;
        arrayPrice[1] = disccount;
        return arrayPrice;
    };
    /*=============================================
      Función que nos avisa cuando finaliza el renderizado de Angular
      =============================================*/
    BestSalesItemsComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            funtions_1.OwlCarouselConfig.fnc();
            funtions_1.CarouselNavigation.fnc();
            funtions_1.Rating.fnc();
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
