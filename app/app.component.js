System.register(['angular2/core', 'angular2/http', 'angular2/common', './cases/case', './properties/property', './requesters/requester', './cases/case.service', './casefiles/casefile.service', './properties/property.service', './requesters/requester.service'], function(exports_1, context_1) {
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
    var core_1, http_1, common_1, case_1, property_1, requester_1, case_service_1, casefile_service_1, property_service_1, requester_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (case_1_1) {
                case_1 = case_1_1;
            },
            function (property_1_1) {
                property_1 = property_1_1;
            },
            function (requester_1_1) {
                requester_1 = requester_1_1;
            },
            function (case_service_1_1) {
                case_service_1 = case_service_1_1;
            },
            function (casefile_service_1_1) {
                casefile_service_1 = casefile_service_1_1;
            },
            function (property_service_1_1) {
                property_service_1 = property_service_1_1;
            },
            function (requester_service_1_1) {
                requester_service_1 = requester_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(fb, _caseService, _casefileService, _propertyService, _requesterService) {
                    this._caseService = _caseService;
                    this._casefileService = _casefileService;
                    this._propertyService = _propertyService;
                    this._requesterService = _requesterService;
                    this.requestcase = {};
                    this.requestproperty = {};
                    this.requestrequester = {};
                    this._filesToUpload = [];
                    this.filesToUploadDetails = [];
                    this.active = true;
                    this.notready = true;
                    this.noxhr = true;
                    this.alreadyExists = true;
                    this.salutations = ['Mr.', 'Ms.', 'Dr.'];
                    this.pstreet = new common_1.Control("", common_1.Validators.required);
                    this.punit = new common_1.Control("");
                    this.pcity = new common_1.Control("", common_1.Validators.required);
                    this.pstate = new common_1.Control("");
                    this.pzipcode = new common_1.Control("");
                    this.subdivision = new common_1.Control("");
                    this.policy_number = new common_1.Control("");
                    this.salutation = new common_1.Control("");
                    this.first_name = new common_1.Control("", common_1.Validators.required);
                    this.last_name = new common_1.Control("", common_1.Validators.required);
                    this.organization = new common_1.Control("");
                    this.email = new common_1.Control("");
                    this.rstreet = new common_1.Control("");
                    this.runit = new common_1.Control("");
                    this.rcity = new common_1.Control("");
                    this.rstate = new common_1.Control("");
                    this.rzipcode = new common_1.Control("");
                    this.casefiles = new common_1.Control("");
                    this.hideWelcome = false;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = true;
                    this.hidePropertyGroup = true;
                    this.hideRequesterGroup = true;
                    this.hideCasefileGroup = true;
                    this.hideSummary = true;
                    this.caseForm = fb.group({
                        propertygroup: fb.group({
                            street: this.pstreet,
                            unit: this.punit,
                            city: this.pcity,
                            state: this.pstate,
                            zipcode: this.pzipcode,
                            subdivision: this.subdivision,
                            policy_number: this.policy_number
                        }),
                        requestergroup: fb.group({
                            salutation: this.salutation,
                            first_name: this.first_name,
                            last_name: this.last_name,
                            organization: this.organization,
                            email: this.email,
                            street: this.rstreet,
                            unit: this.runit,
                            city: this.rcity,
                            state: this.rstate,
                            zipcode: this.rzipcode
                        }),
                        casefilegroup: fb.group({
                            casefiles: this.casefiles
                        })
                    });
                    // check of the browser supports XHR2, which allows file drag and drop
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        this.noxhr = false;
                    }
                    this.notready = false;
                }
                AppComponent.prototype.showStatusLookup = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = false;
                    this.hideCaseForm = true;
                    this.hideSummary = true;
                };
                AppComponent.prototype.showCaseForm = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = false;
                    this.hidePropertyGroup = false;
                    this.hideRequesterGroup = true;
                    this.hideCasefileGroup = true;
                    this.hideSummary = true;
                };
                AppComponent.prototype.showPropertyGroup = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = false;
                    this.hidePropertyGroup = false;
                    this.hideRequesterGroup = true;
                    this.hideCasefileGroup = true;
                    this.hideSummary = true;
                };
                AppComponent.prototype.showRequesterGroup = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = false;
                    this.hidePropertyGroup = true;
                    this.hideRequesterGroup = false;
                    this.hideCasefileGroup = true;
                    this.hideSummary = true;
                };
                AppComponent.prototype.showCasefileGroup = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = false;
                    this.hidePropertyGroup = true;
                    this.hideRequesterGroup = true;
                    this.hideCasefileGroup = false;
                    this.hideSummary = true;
                };
                AppComponent.prototype.showSummary = function () {
                    this.hideWelcome = true;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = true;
                    this.hideSummary = false;
                };
                AppComponent.prototype.showWelcome = function () {
                    this.hideWelcome = false;
                    this.hideStatusLookup = true;
                    this.hideCaseForm = true;
                    this.hideSummary = true;
                };
                AppComponent.prototype.getCaseStatus = function (caseID) {
                    var _this = this;
                    this.notready = true;
                    this._caseService.getCases(new http_1.URLSearchParams('case_hash=' + caseID))
                        .subscribe(function (acase) {
                        _this._myCase = acase[0];
                        _this.requestcase = _this._myCase;
                        document.getElementById("case_id").innerHTML = '';
                        _this.showSummary();
                        _this.notready = false;
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype.fillNFIP = function () {
                    var _this = this;
                    var nfip = this._requesterService.getRequesters(new http_1.URLSearchParams('organization=NFIP'))
                        .subscribe(function (requester) {
                        _this._myRequester = requester[0];
                        // TODO: populate requester controls
                    }, function (error) { return console.error(error); });
                };
                ;
                AppComponent.prototype.fileDragHover = function (fileInput) {
                    fileInput.stopPropagation();
                    fileInput.preventDefault();
                    //fileInput.target.className = (fileInput.type == "dragover" ? "hover" : "");
                };
                AppComponent.prototype.fileSelectHandler = function (fileInput) {
                    this.fileDragHover(fileInput);
                    var selectedFiles = fileInput.target.files || fileInput.dataTransfer.files;
                    for (var i = 0, j = selectedFiles.length; i < j; i++) {
                        this._filesToUpload.push(selectedFiles[i]);
                    }
                    for (var i = 0, f = void 0; f = this._filesToUpload[i]; i++) {
                        var fileDetails = { 'name': f.name, 'size': ((f.size) / 1024 / 1024).toFixed(3) };
                        this.filesToUploadDetails.push(fileDetails);
                    }
                };
                AppComponent.prototype.removeCasefile = function (index) {
                    this._filesToUpload.splice(index, 1);
                    this.filesToUploadDetails.splice(index, 1);
                };
                AppComponent.prototype.updateSalutationControlValue = function (value) {
                    this.salutation.updateValue(value);
                };
                AppComponent.prototype.clearForm = function () {
                    var _this = this;
                    // reset the form
                    this.active = false;
                    setTimeout(function () { _this.notready = false; _this.active = true; }, 1000);
                };
                AppComponent.prototype.onSubmit = function (newrequest) {
                    // check if the submitter is a bot or a human
                    // a bot will fill in the test field, but a human will not because it is hidden
                    if (document.getElementById("test").innerHTML != '') {
                        return false;
                    }
                    this.notready = true;
                    // ensure required fields have values
                    // TODO remove the console logging and replace with proper user notification
                    if (!newrequest.propertygroup.street && !newrequest.propertygroup.city) {
                        console.log("Warning: couldn't find the property street and/or city");
                        return;
                    }
                    if (!newrequest.requestergroup.first_name && !newrequest.requestergroup.last_name) {
                        console.log("Warning: couldn't find the requester first name and/or last name");
                        return;
                    }
                    // ensure no fields are null (use empty strings if null)
                    for (var group in newrequest) {
                        for (var key in group) {
                            if (!newrequest[key]) {
                                newrequest[key] = "";
                            }
                        }
                    }
                    // create the local models
                    this._myCase = new case_1.Case();
                    this._myProperty = new property_1.Property(newrequest.propertygroup.street, newrequest.propertygroup.city, newrequest.propertygroup.state, newrequest.propertygroup.zipcode, newrequest.propertygroup.unit, newrequest.propertygroup.subdivision, newrequest.propertygroup.policy_number);
                    this._myRequester = new requester_1.Requester(newrequest.requestergroup.first_name, newrequest.requestergroup.last_name, newrequest.requestergroup.salutation, newrequest.requestergroup.organization, newrequest.requestergroup.email, newrequest.requestergroup.street, newrequest.requestergroup.unit, newrequest.requestergroup.city, newrequest.requestergroup.state, newrequest.requestergroup.zipcode);
                    // check if the property, requester, or case already exist
                    this._getProperties(this._myProperty);
                    if (this._foundProperties.length > 0) {
                        this._myProperty.id = this._foundProperties[0].id;
                    }
                    this._getRequesters(this._myRequester);
                    if (this._foundRequesters.length > 0) {
                        this._myRequester.id = this._foundRequesters[0].id;
                    }
                    if (this._myProperty.id && this._myRequester.id) {
                        this._getCases(this._myProperty.id, this._myRequester.id);
                        if (this._foundCases.length > 0) {
                            // inform the user that the request already exists and how the summary
                            this._myCase.id = this._foundCases[0].id;
                            this.showSummary();
                            this.clearForm();
                            this.alreadyExists = true;
                            this.notready = false;
                        }
                        else {
                            // send the new request to the DB
                            this._createRequest();
                        }
                    }
                };
                AppComponent.prototype._getCases = function (propertyID, requesterID) {
                    var _this = this;
                    this._caseService.getCases(new http_1.URLSearchParams('property=' + propertyID + '&requester=' + requesterID))
                        .subscribe(function (cases) {
                        _this._foundCases = cases;
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._getProperties = function (property) {
                    var _this = this;
                    this._propertyService.getProperties(new http_1.URLSearchParams('street=' + property.street
                        + '&unit=' + property.unit
                        + '&city=' + property.city
                        + '&state=' + property.state
                        + '&zipcode=' + property.zipcode))
                        .subscribe(function (properties) {
                        _this._foundProperties = properties;
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._getRequesters = function (requester) {
                    var _this = this;
                    this._requesterService.getRequesters(new http_1.URLSearchParams('salutation=' + requester.salutation
                        + '&first_name=' + requester.first_name
                        + '&last_name=' + requester.last_name
                        + '&organization=' + requester.organization
                        + '&email=' + requester.email
                        + '&street=' + requester.street
                        + '&unit=' + requester.unit
                        + '&city=' + requester.city
                        + '&state=' + requester.state
                        + '&zipcode=' + requester.zipcode))
                        .subscribe(function (requesters) {
                        _this._foundRequesters = requesters;
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._createRequest = function () {
                    if (this._myRequester.id && this._myProperty.id) {
                        this._assignRequesterID();
                        this._assignPropertyID();
                        this._callCreateCase();
                    }
                    else if (this._myRequester.id && !this._myProperty.id) {
                        this._assignRequesterID();
                        this._callCreatePropertyAndCase();
                    }
                    else {
                        this._callCreateRequesterAndPropertyAndCase();
                    }
                };
                AppComponent.prototype._assignRequesterID = function () {
                    this._myCase.requester = this._myRequester.id;
                };
                AppComponent.prototype._assignPropertyID = function () {
                    this._myCase.property = this._myProperty.id;
                };
                AppComponent.prototype._callCreateRequesterAndPropertyAndCase = function () {
                    var _this = this;
                    // create the requester object, then grab its ID for the relation to the case
                    this._requesterService.createRequester(this._myRequester)
                        .subscribe(function (newrequester) {
                        _this._myRequester = newrequester;
                        _this._assignRequesterID();
                        // create the property object, then grab its ID for the relation to the case
                        _this._callCreatePropertyAndCase();
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._callCreatePropertyAndCase = function () {
                    var _this = this;
                    // create the property object, then grab its ID for the relation to the case
                    this._propertyService.createProperty(this._myProperty)
                        .subscribe(function (newproperty) {
                        _this._myProperty = newproperty;
                        _this._assignPropertyID();
                        // create the new case
                        _this._callCreateCase();
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._callCreateCase = function () {
                    var _this = this;
                    // create the new case
                    this._caseService.createCase(this._myCase)
                        .subscribe(function (newcase) {
                        _this._myCase = newcase;
                        _this.requestcase = _this._myCase;
                        _this.requestproperty = _this._myProperty;
                        _this.requestrequester = _this._myRequester;
                        if (_this._filesToUpload.length > 0) {
                            _this._callCreateCasefiles();
                        }
                        else {
                            _this.showSummary();
                            _this.clearForm();
                            _this.notready = false;
                        }
                    }, function (error) { return console.error(error); });
                };
                AppComponent.prototype._callCreateCasefiles = function () {
                    var _this = this;
                    // create the new casefiles
                    this._casefileService.createCasefiles(this._myCase.id, this._filesToUpload)
                        .then(function (result) {
                        _this.showSummary();
                        _this.clearForm();
                        _this.notready = false;
                    }, function (error) {
                        console.error(error);
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            property_service_1.PropertyService,
                            requester_service_1.RequesterService,
                            case_service_1.CaseService,
                            casefile_service_1.CasefileService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, case_service_1.CaseService, casefile_service_1.CasefileService, property_service_1.PropertyService, requester_service_1.RequesterService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map