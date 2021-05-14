"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubCategoriesService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config");
var SubCategoriesService = /** @class */ (function () {
    function SubCategoriesService(http) {
        this.http = http;
        this.api = config_1.Api.url;
    }
    SubCategoriesService.prototype.getFilterData = function (orderBy, equalTo) {
        return this.http.get(this.api + "sub-categories.json?orderBy=\"" + orderBy + "\"&equalTo=\"" + equalTo + "\"&print=pretty");
    };
    SubCategoriesService.prototype.pathData = function (id, value) {
        return this.http.patch(this.api + "sub-categories/" + id + ".json", value);
    };
    SubCategoriesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SubCategoriesService);
    return SubCategoriesService;
}());
exports.SubCategoriesService = SubCategoriesService;
