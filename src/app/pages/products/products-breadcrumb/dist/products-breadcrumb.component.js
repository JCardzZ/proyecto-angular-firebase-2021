"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsBreadcrumbComponent = void 0;
var core_1 = require("@angular/core");
var ProductsBreadcrumbComponent = /** @class */ (function () {
    function ProductsBreadcrumbComponent(categoriesService, subCategoriesService, activatedRoute) {
        this.categoriesService = categoriesService;
        this.subCategoriesService = subCategoriesService;
        this.activatedRoute = activatedRoute;
        this.breadCrumb = null;
    }
    ProductsBreadcrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = this.activatedRoute.snapshot.params["param"];
        /*================================================================
             Filtramos data de las categorias
        =================================================================*/
        this.categoriesService.getFilterData("url", params)
            .subscribe(function (resp1) {
            if (Object.keys(resp1).length > 0) {
                var i = void 0;
                for (i in resp1) {
                    _this.breadCrumb = resp1[i].name;
                }
            }
            else {
                /*================================================================
                        Filtramos data de las Subcategorias
                   =================================================================*/
                _this.subCategoriesService.getFilterData("url", params)
                    .subscribe(function (resp2) {
                    var i;
                    for (i in resp2) {
                        _this.breadCrumb = resp2[i].name;
                    }
                });
            }
        });
    };
    ProductsBreadcrumbComponent = __decorate([
        core_1.Component({
            selector: 'app-products-breadcrumb',
            templateUrl: './products-breadcrumb.component.html',
            styleUrls: ['./products-breadcrumb.component.css']
        })
    ], ProductsBreadcrumbComponent);
    return ProductsBreadcrumbComponent;
}());
exports.ProductsBreadcrumbComponent = ProductsBreadcrumbComponent;