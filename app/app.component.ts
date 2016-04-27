import {Component}         from 'angular2/core';
import {HTTP_PROVIDERS, URLSearchParams}    from 'angular2/http';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';
import {Case}              from './cases/case'
import {Property}          from './properties/property'
import {Requester}         from './requesters/requester';
import {CaseService}       from './cases/case.service';
import {CasefileService}   from './casefiles/casefile.service';
import {PropertyService}   from './properties/property.service';
import {RequesterService}  from './requesters/requester.service';
import {APP_SETTINGS}      from './app.settings';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives:[FORM_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        PropertyService,
        RequesterService,
        CaseService,
        CasefileService]
})
export class AppComponent {

    requestcase = {};
    requestproperty = {};
    requestrequester = {};
    
    private _filesToUpload = [];
    filesToUploadDetails: Object[] = [];
    active = true;
    notready: Boolean = true;
    noxhr: Boolean = true;
    alreadyExists: Boolean = false;
    salutations: string[] = APP_SETTINGS.SALUTATIONS;
    states: string[] = APP_SETTINGS.US_STATES;

    //private _today = new Date().toISOString().substr(0,10);
    
    private _myCase: Case;
    private _myProperty: Property;
    private _myRequester: Requester;

    caseForm: ControlGroup;

    propertygroup: ControlGroup;
    pstreet: Control = new Control("", Validators.required);
    punit: Control = new Control("");
    pcity: Control = new Control("", Validators.required);
    pstate: Control = new Control("");
    pzipcode: Control = new Control("");
    subdivision: Control = new Control("");
    policy_number: Control = new Control("");

    requestergroup: ControlGroup;
    salutation: Control = new Control("");
    first_name: Control = new Control("", Validators.required);
    last_name: Control = new Control("", Validators.required);
    organization: Control = new Control("");
    email: Control = new Control("");
    rstreet: Control = new Control("");
    runit: Control = new Control("");
    rcity: Control = new Control("");
    rstate: Control = new Control("");
    rzipcode: Control = new Control("");

    casefilegroup: ControlGroup;
    casefiles: Control = new Control("");

    constructor (fb: FormBuilder,
                private _caseService: CaseService,
                private _casefileService: CasefileService,
                private _propertyService: PropertyService,
                private _requesterService: RequesterService
                ) {

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

        // check if the browser supports XHR2, which allows file drag and drop
        let xhr = new XMLHttpRequest();
	    if (xhr.upload) {
            this.noxhr = false;
        }

        this.notready = false;
    }

    hideWelcome = false;
    hideStatusLookup = true;
    hideCaseForm = true;
    hidePropertyGroup = true;
    hideRequesterGroup = true;
    hideCasefileGroup = true;
    hideSummary = true;

    showStatusLookup(){
        this.hideWelcome = true;
        this.hideStatusLookup = false;
        this.hideCaseForm = true;
        this.hideSummary = true;
    }

    showCaseForm(){
        this.hideWelcome = true;
        this.hideStatusLookup = true;
        this.hideCaseForm = false;
        this.hidePropertyGroup = false;
        this.hideRequesterGroup = true;
        this.hideCasefileGroup = true;
        this.hideSummary = true;
    }

    showPropertyGroup(){
        this.hideWelcome = true;
        this.hideStatusLookup = true;
        this.hideCaseForm = false;
        this.hidePropertyGroup = false;
        this.hideRequesterGroup = true;
        this.hideCasefileGroup = true;
        this.hideSummary = true;
    }

    showRequesterGroup(){
        this.hideWelcome = true;
        this.hideStatusLookup = true;
        this.hideCaseForm = false;
        this.hidePropertyGroup = true;
        this.hideRequesterGroup = false;
        this.hideCasefileGroup = true;
        this.hideSummary = true;
    }

    showCasefileGroup(){
        this.hideWelcome = true;
        this.hideStatusLookup = true;
        this.hideCaseForm = false;
        this.hidePropertyGroup = true;
        this.hideRequesterGroup = true;
        this.hideCasefileGroup = false;
        this.hideSummary = true;
    }

    showSummary() {
        this.hideWelcome = true;
        this.hideStatusLookup = true;
        this.hideCaseForm = true;
        this.hideSummary = false;
    }

    showWelcome() {
        this.hideWelcome = false;
        this.hideStatusLookup = true;
        this.hideCaseForm = true;
        this.hideSummary = true;
    }
    
    getCaseStatus(caseID: string) {
        this.notready = true;

        this._caseService.getCases(new URLSearchParams('case_hash='+caseID))
            .subscribe(
                acase => {
                    this._myCase = acase[0];
                    this.requestcase = this._myCase;
                    document.getElementById("case_id").innerHTML = '';
                    this.showSummary();
                    this.notready = false;
                },
                error =>  console.error(<any>error));
    }

    fillNFIP() {
        let nfip = this._requesterService.getRequesters(new URLSearchParams('organization=NFIP'))
            .subscribe(
                requester => {
                    this._myRequester = requester[0];
                    // TODO: populate requester controls
                },
                error =>  console.error(<any>error));
    };

    fileDragHover(fileInput) {
        fileInput.stopPropagation();
        fileInput.preventDefault();
        //fileInput.target.className = (fileInput.type == "dragover" ? "hover" : "");
    }

    fileSelectHandler(fileInput: any){
        this.fileDragHover(fileInput);
        let selectedFiles = <Array<File>> fileInput.target.files || fileInput.dataTransfer.files;
        for (let i = 0, j = selectedFiles.length; i < j; i++) {
            this._filesToUpload.push(selectedFiles[i]);
        }
        for (let i = 0, f; f = this._filesToUpload[i]; i++) {
            let fileDetails = {'name': f.name, 'size': ((f.size)/1024/1024).toFixed(3)};
            this.filesToUploadDetails.push(fileDetails);
        }
    }

    removeCasefile(index: number) {
        this._filesToUpload.splice(index, 1);
        this.filesToUploadDetails.splice(index, 1);
    }

    updateSalutationControlValue(value) {
        this.salutation.updateValue(value);
    }

    clearForm() {
        // reset the form
        this.active = false;
        setTimeout(()=> { this.notready = false; this.active=true; }, 1000);
    }

    onSubmit (newrequest) {

        // check if the submitter is a bot or a human
        // a bot will fill in the test field, but a human will not because it is hidden
        if (document.getElementById("test").innerHTML != '') {
            return false;
        }

        this.notready = true;

        // ensure required fields have values
        // TODO remove the console logging and replace with proper user notification
        if (!newrequest.propertygroup.street && !newrequest.propertygroup.city) 
            {console.log("Warning: couldn't find the property street and/or city"); return;}
        if (!newrequest.requestergroup.first_name && !newrequest.requestergroup.last_name) 
            {console.log("Warning: couldn't find the requester first name and/or last name"); return;}

        // ensure no fields are null (use empty strings if null)
        for (let group in newrequest) {
            for (let key in group) {
                if (!newrequest[key]) {
                    newrequest[key] = "";
                }
            }
        }
        
        // create the local models
        this._myCase = new Case();
        this._myProperty = new Property(
            newrequest.propertygroup.street, newrequest.propertygroup.city, newrequest.propertygroup.state,
            newrequest.propertygroup.zipcode, newrequest.propertygroup.unit,
            newrequest.propertygroup.subdivision, newrequest.propertygroup.policy_number);
        this._myRequester = new Requester(
            newrequest.requestergroup.first_name, newrequest.requestergroup.last_name,
            newrequest.requestergroup.salutation, newrequest.requestergroup.organization,
            newrequest.requestergroup.email, newrequest.requestergroup.street, newrequest.requestergroup.unit,
            newrequest.requestergroup.city, newrequest.requestergroup.state, newrequest.requestergroup.zipcode);

        // check if the property, requester, or case already exist
        this._getProperties(this._myProperty);

    }

    private _getCases(propertyID: number, requesterID: number) {
        this._caseService.getCases(new URLSearchParams('property='+propertyID+'&requester='+requesterID))
            .subscribe(
                cases => {
                    if (cases.length > 0) {
                        // inform the user that the request already exists and how the summary
                        this._myCase.id = cases[0].id;
                        this.showSummary();
                        this.clearForm();
                        this.alreadyExists = true;
                        this.notready = false;
                    }
                    else {
                        // send the new request to the DB
                        this._createRequest();
                    }
                },
                error => console.error(<any>error));
    }

    private _getProperties(property: Property) {
        this._propertyService.getProperties(
            new URLSearchParams(
                'street='+property.street
                +'&unit='+property.unit
                +'&city='+property.city
                +'&state='+property.state
                +'&zipcode='+property.zipcode
            ))
            .subscribe(
                properties => {
                    if (properties.length > 0) {this._myProperty.id = properties[0].id;}
                    this._getRequesters(this._myRequester);
                },
                error => console.error(<any>error));
    }

    private _getRequesters(requester: Requester) {
        this._requesterService.getRequesters(
            new URLSearchParams(
                'salutation='+requester.salutation
                +'&first_name='+requester.first_name
                +'&last_name='+requester.last_name
                +'&organization='+requester.organization
                +'&email='+requester.email
                +'&street='+requester.street
                +'&unit='+requester.unit
                +'&city='+requester.city
                +'&state='+requester.state
                +'&zipcode='+requester.zipcode
            ))
            .subscribe(
                requesters => {
                    if (requesters.length > 0) {this._myRequester.id = requesters[0].id;}
                    if (this._myProperty.id && this._myRequester.id) {
                        this._getCases(this._myProperty.id, this._myRequester.id);
                    }
                    else {
                        // send the new request to the DB
                        this._createRequest();
                    }
                },
                error => console.error(<any>error));
    }
    
    private _createRequest () {
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
    }

    private _assignRequesterID () {
        this._myCase.requester = this._myRequester.id;
    }

    private _assignPropertyID () {
        this._myCase.property = this._myProperty.id;
    }

    private _callCreateRequesterAndPropertyAndCase () {
        // create the requester object, then grab its ID for the relation to the case
        this._requesterService.createRequester(this._myRequester)
            .subscribe(
                newrequester => {
                    this._myRequester = newrequester;
                    this._assignRequesterID();
                    // create the property object, then grab its ID for the relation to the case
                    this._callCreatePropertyAndCase();
                },
                error =>  console.error(<any>error));
    }

    private _callCreatePropertyAndCase () {
        // create the property object, then grab its ID for the relation to the case
        this._propertyService.createProperty(this._myProperty)
            .subscribe(
                newproperty => {
                    this._myProperty = newproperty;
                    this._assignPropertyID();
                    // create the new case
                    this._callCreateCase();
                },
                error =>  console.error(<any>error));
    }

    private _callCreateCase () {
        // create the new case
        this._caseService.createCase(this._myCase)
            .subscribe(
                newcase => {
                    this._myCase = newcase;
                    this.requestcase = this._myCase;
                    this.requestproperty = this._myProperty;
                    this.requestrequester = this._myRequester;
                    if (this._filesToUpload.length > 0) {
                        this._callCreateCasefiles();
                    }
                    else {
                        this.showSummary();
                        this.clearForm();
                        this.notready = false;
                    }
                },
                error =>  console.error(<any>error)
            );
    }

    private _callCreateCasefiles () {
        // create the new casefiles
        this._casefileService.createCasefiles(this._myCase.id, this._filesToUpload)
            .then(
                (result) => {
                    this.showSummary();
                    this.clearForm();
                    this.notready = false;
                },
                (error) => {
                    console.error(error);
                }
            );
    }

}
