System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var CaseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            CaseService = (function () {
                function CaseService(http) {
                    this.http = http;
                    this._CasesUrl = 'http://localhost:8000/cbraservices/cases/';
                }
                CaseService.prototype.getCase = function (id) {
                    return this.http.get(this._CasesUrl + id + '/')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CaseService.prototype.getCases = function (searchArgs) {
                    return this.http.get(this._CasesUrl, { search: searchArgs })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CaseService.prototype.createCase = function (acase) {
                    //let newcase = new Case(acase.request_date, acase.requester, acase.property, acase.casefiles, acase.id);
                    var body = JSON.stringify(acase);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this._CasesUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CaseService.prototype.handleError = function (error) {
                    // TODO figure out a better error handler
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                CaseService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CaseService);
                return CaseService;
            }());
            exports_1("CaseService", CaseService);
        }
    }
});
//# sourceMappingURL=case.service.js.map