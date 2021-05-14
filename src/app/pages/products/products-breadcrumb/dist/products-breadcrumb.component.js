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
        this.params = null;
    }
    ProductsBreadcrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];
        /*================================================================
             Filtramos data de las categorias
        =================================================================*/
        this.categoriesService.getFilterData("url", this.params)
            .subscribe(function (resp1) {
            if (Object.keys(resp1).length > 0) {
                var i = void 0;
                for (i in resp1) {
                    _this.breadCrumb = resp1[i].name;
                    var id = Object.keys(resp1).toString();
                    var value = {
                        "view": Number(resp1[i].view + 1)
                    };
                    _this.categoriesService.pathData(id, value)
                        .subscribe(function (resp) { });
                }
            }
            else {
                /*================================================================
                        Filtramos data de las Subcategorias
                   =================================================================*/
                _this.subCategoriesService.getFilterData("url", _this.params)
                    .subscribe(function (resp2) {
                    var i;
                    for (i in resp2) {
                        _this.breadCrumb = resp2[i].name;
                        var id = Object.keys(resp2).toString();
                        var value = {
                            "view": Number(resp2[i].view + 1)
                        };
                        _this.subCategoriesService.pathData(id, value)
                            .subscribe(function (resp) { });
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
