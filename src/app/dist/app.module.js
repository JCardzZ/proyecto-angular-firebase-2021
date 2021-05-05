"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var header_component_1 = require("./modules/header/header.component");
var header_promotion_component_1 = require("./modules/header-promotion/header-promotion.component");
var header_mobile_component_1 = require("./modules/header-mobile/header-mobile.component");
var newletter_component_1 = require("./modules/newletter/newletter.component");
var footer_component_1 = require("./modules/footer/footer.component");
var home_component_1 = require("./pages/home/home.component");
var products_component_1 = require("./pages/products/products.component");
var product_component_1 = require("./pages/product/product.component");
var search_component_1 = require("./pages/search/search.component");
var error404_component_1 = require("./pages/error404/error404.component");
var home_banner_component_1 = require("./pages/home/home-banner/home-banner.component");
var home_features_component_1 = require("./pages/home/home-features/home-features.component");
var home_promotions_component_1 = require("./pages/home/home-promotions/home-promotions.component");
var home_hot_today_component_1 = require("./pages/home/home-hot-today/home-hot-today.component");
var home_top_categories_component_1 = require("./pages/home/home-top-categories/home-top-categories.component");
var home_showcase_component_1 = require("./pages/home/home-showcase/home-showcase.component");
var products_breadcrumb_component_1 = require("./pages/products/products-breadcrumb/products-breadcrumb.component");
var best_sales_items_component_1 = require("./pages/products/best-sales-items/best-sales-items.component");
var products_recomended_component_1 = require("./pages/products/products-recomended/products-recomended.component");
var products_showcase_component_1 = require("./pages/products/products-showcase/products-showcase.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                header_promotion_component_1.HeaderPromotionComponent,
                header_mobile_component_1.HeaderMobileComponent,
                newletter_component_1.NewletterComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                products_component_1.ProductsComponent,
                product_component_1.ProductComponent,
                search_component_1.SearchComponent,
                error404_component_1.Error404Component,
                home_banner_component_1.HomeBannerComponent,
                home_features_component_1.HomeFeaturesComponent,
                home_promotions_component_1.HomePromotionsComponent,
                home_hot_today_component_1.HomeHotTodayComponent,
                home_top_categories_component_1.HomeTopCategoriesComponent,
                home_showcase_component_1.HomeShowcaseComponent,
                products_breadcrumb_component_1.ProductsBreadcrumbComponent,
                best_sales_items_component_1.BestSalesItemsComponent,
                products_recomended_component_1.ProductsRecomendedComponent,
                products_showcase_component_1.ProductsShowcaseComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
