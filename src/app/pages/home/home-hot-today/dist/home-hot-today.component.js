"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeHotTodayComponent = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var funtions_1 = require("../../../funtions");
var HomeHotTodayComponent = /** @class */ (function () {
    function HomeHotTodayComponent(productsService, salesService) {
        this.productsService = productsService;
        this.salesService = salesService;
        this.path = config_1.Path.url;
        this.indexes = [];
        this.products = [];
        this.render = true;
        this.cargando = false;
        this.topSales = [];
        this.topSalesBlock = [];
        this.renderBestSeler = true;
    }
    HomeHotTodayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        var getProducts = [];
        var hoy = new Date();
        var fechaOferta = null;
        /*=================================================
          Tomar la longitud del objeto
        ==================================================*/
        this.productsService.getData()
            .subscribe(function (resp) {
            /*============================================================
           Recorremos cada producto para separar las ofertas y el stock
         =================================================================*/
            var i;
            for (i in resp) {
                getProducts.push({
                    "offer": JSON.parse(resp[i].offer),
                    "stock": resp[i].stock
                });
                _this.products.push(resp[i]);
                _this.cargando = false;
            }
            /*===================================================================================================
           Recorremos cada oferta y stock para cñasificar las ofertas actuales y los productos que si tengan stock
         =========================================================================================================*/
            for (i in getProducts) {
                fechaOferta = new Date(parseInt(getProducts[i]["offer"][2].split("-")[0]), parseInt(getProducts[i]["offer"][2].split("-")[1]) - 1, parseInt(getProducts[i]["offer"][2].split("-")[2]));
                // console.log("fechaOferta", fechaOferta );
                //console.log("hoy", hoy);
                if (hoy < fechaOferta && getProducts[i]["stock"] > 0) {
                    _this.indexes.push(i);
                    //  console.log("indexes", this.indexes);
                }
            }
        });
        /*=================================
        Tomamos la data de las ventas
        ====================================*/
        var getSales = [];
        this.salesService.getData()
            .subscribe(function (resp) {
            //   console.log("resp", resp);
            /*===================================================================
           Recorremos cada venta separar los productos y las cantidades
           ======================================================================*/
            var i;
            for (i in resp) {
                getSales.push({
                    "product": resp[i].product,
                    "quantity": resp[i].quantity
                });
            }
            /*===================================================================
          Ordenamos de mayor a menor el arrelo de objetos
          ======================================================================*/
            getSales.sort(function (a, b) {
                return (b.quantity - a.quantity);
            });
            /*===================================================================
              Sacamos del arreglo los productos repetidos dejando los de mayor venta
            ======================================================================*/
            var filterSales = [];
            getSales.forEach(function (sale) {
                if (!filterSales.find(function (resp) { return resp.product == sale.product; })) {
                    var product = sale.product, quantity = sale.quantity;
                    filterSales.push({ product: product, quantity: quantity });
                }
            });
            /*===================================================================
              Filtramos la data de productos buscando coincidencias con las ventas
            ======================================================================*/
            var block = 0;
            filterSales.forEach(function (sale, index) {
                /*============================
                  Filtramos hasta 20 ventas
                ==============================*/
                if (index < 20) {
                    block++;
                    _this.productsService.getFilterData("name", sale.product)
                        .subscribe(function (resp) {
                        var i;
                        for (i in resp) {
                            _this.topSales.push(resp[i]);
                        }
                    });
                }
            });
            /*===================================================================
              Enviamos el minimo de bloques para mostrar 4 productos por bloque
            ======================================================================*/
            for (var i_1 = 0; i_1 < Math.round(block / 4); i_1++) {
                _this.topSalesBlock.push(i_1);
                //console.log("this.topSales", this.topSalesBlock);
            }
        });
    };
    /*================================================================
   Función que nos avisa cuando finaliza el renderizado de Angular
      =================================================================*/
    HomeHotTodayComponent.prototype.callback = function () {
        if (this.render) {
            this.render = false;
            /*================================================================
           Seleccionar del DOM los elementos de la reseña
              =================================================================*/
            var review_1 = $(".review_1");
            var review_2 = $(".review_2");
            var review_3 = $(".review_3");
            /*================================================================
         Seleccionar del DOM de los elementos de la oferta
        =================================================================*/
            var offer_1 = $(".offer_1");
            var offer_2 = $(".offer_2");
            var offer_3 = $(".offer_3");
            /*================================================================
           Seleccionar del DOM los elementos de la galeria mixta
              =================================================================*/
            var galleryMix_1 = $(".galleryMix_1");
            var galleryMix_2 = $(".galleryMix_2");
            var galleryMix_3 = $(".galleryMix_3");
            /*================================================================
           Recorremos todos los índices de productos
              =================================================================*/
            for (var i = 0; i < galleryMix_1.length; i++) {
                /*================================================================
                 Recorremos todos los índices de productos
                =================================================================*/
                for (var f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++) {
                    /*================================================================
                     Agreagr imágenes grandes
                    =================================================================*/
                    $(galleryMix_2[i]).append("<div class=\"item\">\n            <a href=\"assets/img/products/" + $(galleryMix_1[i]).attr("category") + "/gallery/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n                <img src=\"assets/img/products/" + $(galleryMix_1[i]).attr("category") + "/gallery/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n            </a>\n        </div>");
                    /*================================================================
                       Agreagr imágenes pequeñas
                      =================================================================*/
                    $(galleryMix_3[i]).append("<div class=\"item\">\n   <img src=\"assets/img/products/" + $(galleryMix_1[i]).attr("category") + "/gallery/" + JSON.parse($(galleryMix_1[i]).attr("gallery"))[f] + "\">\n</div>");
                }
                /*================================================================
               Capturamos el array de las ofertas de cada producto
              =================================================================*/
                var offer = JSON.parse($(offer_1[i]).attr("offer"));
                //  console.log("offer", offer[0]);
                /*================================================================
                Capturamos el precio de cada producto
               =================================================================*/
                var price = Number($(offer_1[i]).attr("price"));
                /*================================================================
                Preguntamos el descuento
               =================================================================*/
                if (offer[0] == "Disccount") {
                    $(offer_1[i]).html("<span>Save <br> $" + (price * offer[1] / 100).toFixed(2) + "</span>");
                    $(offer_2[i]).html("$" + (price - (price * offer[1] / 100)).toFixed(2));
                }
                /*================================================================
                Preguntamos si el precio ea fijo
               =================================================================*/
                if (offer[0] == "Fixed") {
                    $(offer_1[i]).html(
                    // `<span>Save <br> $${(price-offer[1]).toFixed(2)}</span>`
                    "<span>Save <br> $" + (price - offer[1]).toFixed(2) + "</span>");
                    $(offer_2[i]).html("$" + offer[1]);
                }
                /*================================================================
              Agregamos la fecha al descontador
             =================================================================*/
                $(offer_3[i]).attr("data-time", new Date(parseInt(offer[2].split("-")[0]), parseInt(offer[2].split("-")[1]) - 1, parseInt(offer[2].split("-")[2])));
                /*================================================================
                   Calculamos el total de las calificaciones de los reviews
                  =================================================================*/
                var totalReview = 0;
                for (var f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++) {
                    totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"]);
                }
                /*================================================================
                 Imprimimos el total de las calificaciones para cada producto
                =================================================================*/
                var rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length);
                $(review_3[i]).html(rating);
                for (var f = 1; f <= 5; f++) {
                    $(review_2[i]).append("<option value=\"2\">" + f + "</option");
                    if (rating == f) {
                        $(review_2[i]).children('option').val(1);
                    }
                }
            }
            funtions_1.OwlCarouselConfig.fnc();
            funtions_1.CarouselNavigation.fnc();
            funtions_1.SlickConfig.fnc();
            funtions_1.ProductLightbox.fnc();
            /*================================================================
             Ejecutamos funciones globales con respecto a las ofertas
            =================================================================*/
            funtions_1.CountDown.fnc();
            /*================================================================
          Ejecutamos funciones globales con respecto a las reseñas
         =================================================================*/
            funtions_1.Rating.fnc();
            /*================================================================
            Ejecutamos funciones globales con respecto al stock
            =================================================================*/
            funtions_1.ProgressBar.fnc();
        }
    };
    HomeHotTodayComponent.prototype.callbackBestSeller = function (topSales) {
        if (this.renderBestSeler) {
            this.renderBestSeler = false;
            /*================================================================
                Capturamos la cantidad de 4 productos por bloque
              =================================================================*/
            var topSaleBlock_1 = $(".topSaleBlock");
            var top20Array_1 = [];
            /*================================================================
                Ejecutamos en SetTimeOut por cada bloque un segundo de espera
              =================================================================*/
            setTimeout(function () {
                /*================================================================
                    Removemos el preload
                  =================================================================*/
                $(".preload").remove();
                /*================================================================
                Hacemos un ciclo por la cantidad de bloques
                =================================================================*/
                for (var i = 0; i < topSaleBlock_1.length; i++) {
                    /*================================================================
                   Agregamos la cantidad de 4 productos por bloque
                 =================================================================*/
                    top20Array_1.push(topSales.slice(i * topSaleBlock_1.length, (i * topSaleBlock_1.length) + topSaleBlock_1.length));
                    /*================================================================
                Hacemos un recorrido por el nuevo array de objetos
              =================================================================*/
                    var f = void 0;
                    for (f in top20Array_1[i]) {
                        /*================================================================
                          Definimos si el precio del producto tiene oderta o no
                        =================================================================*/
                        var price = void 0;
                        var type = void 0;
                        var value = void 0;
                        var offer = void 0;
                        if (top20Array_1[i][f].offer != "") {
                            type = JSON.parse(top20Array_1[i][f].offer)[0];
                            value = JSON.parse(top20Array_1[i][f].offer)[1];
                            if (type = "Disccount") {
                                offer = (top20Array_1[i][f].price - (top20Array_1[i][f].price * value / 100)).toFixed(2);
                            }
                            if (type == "Fixed") {
                                // offer = (top20Array[i][f].price - value).toFixed(2)
                                offer = value;
                            }
                            price = "<p class=\"ps-product__price sale\">$" + offer + " <del>$" + top20Array_1[i][f].price + " </del></p>";
                        }
                        else {
                            price = "<p class=\"ps-product_price\">$" + top20Array_1[i][f].price + "</p>";
                        }
                        /*================================================================
                        Adicionar a la vista los productos clasificados
                      =================================================================*/
                        $(topSaleBlock_1[i]).append("\n\n            <div class=\"ps-product--horizontal \">\n\n            <div class=\"ps-product__thumbnail \">\n                <a href=\"product/" + top20Array_1[i][f].url + "\">\n                    <img src=\"assets/img/products/" + top20Array_1[i][f].category + "/" + top20Array_1[i][f].image + "\" alt=\" \">\n                </a>\n            </div>\n\n            <div class=\"ps-product__content \">\n\n                <a class=\"ps-product__title\" href=\"product/" + top20Array_1[i][f].url + "\">" + top20Array_1[i][f].name + "</a>\n\n\n             " + price + "\n\n            </div>\n\n        </div>\n\n\n            ");
                    }
                }
                //console.log("top20Array",top20Array);
                /*=============================================
                Modificamos el estilo del plugin OWL Carousel
                =============================================*/
                $(".owl-dots").css({ "bottom": "0" });
                $(".owl-dot").css({ "background": "#ddd" });
            }, topSaleBlock_1.length * 1000);
        }
    };
    HomeHotTodayComponent = __decorate([
        core_1.Component({
            selector: 'app-home-hot-today',
            templateUrl: './home-hot-today.component.html',
            styleUrls: ['./home-hot-today.component.css']
        })
    ], HomeHotTodayComponent);
    return HomeHotTodayComponent;
}());
exports.HomeHotTodayComponent = HomeHotTodayComponent;
