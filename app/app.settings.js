System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var APP_SETTINGS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            APP_SETTINGS = (function () {
                function APP_SETTINGS() {
                }
                Object.defineProperty(APP_SETTINGS, "AUTH_URL", {
                    get: function () { return this._API_ENDPOINT + 'auth/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "CASES_URL", {
                    get: function () { return this._API_ENDPOINT + 'cases/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "PROPERTIES_URL", {
                    get: function () { return this._API_ENDPOINT + 'properties/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "REQUESTERS_URL", {
                    get: function () { return this._API_ENDPOINT + 'requesters/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "CASEFILES_URL", {
                    get: function () { return this._API_ENDPOINT + 'casefiles/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "COMMENTS_URL", {
                    get: function () { return this._API_ENDPOINT + 'comments/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "TAGS_URL", {
                    get: function () { return this._API_ENDPOINT + 'tags/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "CASETAGS_URL", {
                    get: function () { return this._API_ENDPOINT + 'casetags/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "SYSTEMUNITS_URL", {
                    get: function () { return this._API_ENDPOINT + 'systemunits/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "FIELDOFFICES_URL", {
                    get: function () { return this._API_ENDPOINT + 'fieldoffices/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "SYSTEMMAPS_URL", {
                    get: function () { return this._API_ENDPOINT + 'systemmaps/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "USERS_URL", {
                    get: function () { return this._API_ENDPOINT + 'users/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "DETERMINATIONS_URL", {
                    get: function () { return this._API_ENDPOINT + 'determinations/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "SYSTEMUNITPROHIBITIONDATES_URL", {
                    get: function () { return this._API_ENDPOINT + 'systemunitprohibitiondates/'; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "JSON_HEADERS", {
                    get: function () { return new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "AUTH_HEADERS", {
                    get: function () {
                        return new http_1.Headers({
                            'Authorization': 'Basic ' +
                                btoa((sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'public') + ':' +
                                    (sessionStorage.getItem('password') ? sessionStorage.getItem('password') : 'public'))
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(APP_SETTINGS, "AUTH_JSON_HEADERS", {
                    get: function () {
                        return new http_1.Headers({
                            'Authorization': 'Basic ' +
                                btoa((sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'public') + ':' +
                                    (sessionStorage.getItem('password') ? sessionStorage.getItem('password') : 'public')),
                            'Accept': 'application/json', 'Content-Type': 'application/json' });
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                //private static _API_ENDPOINT: string = 'http://localhost:8000/cbraservices/';
                APP_SETTINGS._API_ENDPOINT = 'http://' + window.location.hostname + '/cbra/cbraservices/';
                APP_SETTINGS = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], APP_SETTINGS);
                return APP_SETTINGS;
            }());
            exports_1("APP_SETTINGS", APP_SETTINGS);
        }
    }
});
//# sourceMappingURL=app.settings.js.map