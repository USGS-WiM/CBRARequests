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
    var CasefileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            CasefileService = (function () {
                function CasefileService(http) {
                    this.http = http;
                    this._CasefilesUrl = 'http://localhost:8000/cbraservices/casefiles/';
                }
                CasefileService.prototype.getCases = function (searchArgs) {
                    return this.http.get(this._CasefilesUrl, { search: searchArgs })
                        .toPromise()
                        .then(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                CasefileService.prototype.createCasefiles = function (caseid, files) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var _loop_1 = function(i) {
                            var formData = new FormData();
                            formData.append("case", caseid);
                            formData.append("file", files[i]);
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 201) {
                                        console.log(xhr.response);
                                        resolve(JSON.parse(xhr.response));
                                    }
                                    else {
                                        reject(xhr.response);
                                    }
                                }
                            };
                            xhr.open("POST", _this._CasefilesUrl, true);
                            xhr.send(formData);
                        };
                        for (var i = 0; i < files.length; i++) {
                            _loop_1(i);
                        }
                    });
                };
                CasefileService.prototype.handleError = function (error) {
                    // TODO figure out a better error handler
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Promise.reject(error.message || error.json().error || 'Server error via Casefile Service');
                };
                CasefileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CasefileService);
                return CasefileService;
            }());
            exports_1("CasefileService", CasefileService);
        }
    }
});
//# sourceMappingURL=casefile.service.js.map