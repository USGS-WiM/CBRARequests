import {Component}         from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';
import {Case}              from './cases/case'
import {Property}          from './properties/property'
import {Requester}         from './requesters/requester';
import {CaseService}       from './cases/case.service';
import {CasefileService}   from './casefiles/casefile.service';
import {PropertyService}   from './properties/property.service';
import {RequesterService}  from './requesters/requester.service';

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
    
    filesToUpload: Array<File>;

    //private _today = new Date().toISOString().substr(0,10);
    
    private _myCase: Case;
    private _myProperty: Property;
    private _myRequester: Requester;

    form: ControlGroup;

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
    files: Control = new Control("");

    constructor (fb: FormBuilder,
                private _caseService: CaseService,
                private _casefileService: CasefileService,
                private _propertyService: PropertyService,
                private _requesterService: RequesterService
                ) {

        this.form = fb.group({
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
                files: this.files
            })
        });
    }

    hidePropertyGroup = false;
    hideRequesterGroup = true;
    hideCasefileGroup = true;
    hideForm = false;
    hideSummary = true;

    showPropertyGroup(){
        this.hidePropertyGroup = false;
        this.hideRequesterGroup = true;
        this.hideCasefileGroup = true;
        this.hideSummary = true;
    }

    showRequesterGroup(){
        this.hidePropertyGroup = true;
        this.hideRequesterGroup = false;
        this.hideCasefileGroup = true;
        this.hideSummary = true;
    }

    showCasefileGroup(){
        this.hidePropertyGroup = true;
        this.hideRequesterGroup = true;
        this.hideCasefileGroup = false;
        this.hideSummary = true;
    }

    showSummary() {
        this.hideForm = true;
        this.hideSummary = false;
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    onSubmit (newrequest) {
        // ensure required fields have values
        // TODO remove the console logging and replace with proper user notification
        if (!newrequest.propertygroup.street && !newrequest.propertygroup.city) 
            {console.log("Warning: couldn't find the property street and/or city"); return;}
        if (!newrequest.requestergroup.first_name && !newrequest.requestergroup.last_name) 
            {console.log("Warning: couldn't find the requester first name and/or last name"); return;}

        // ensure no fields are null (use empty strings if null)
        for (var group in newrequest) {
            for (var key in group) {
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

        // send the new requester to the DB
        this._createRequest();
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
                    console.log(newrequester);
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
                    console.log(newproperty);
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
                    console.log(newcase);
                    this._myCase = newcase;
                    this.requestcase = this._myCase;
                    this.requestproperty = this._myProperty;
                    this.requestrequester = this._myRequester;
                    if (this.filesToUpload) {
                        this._callCreateCasefiles();
                    }
                    else {this.showSummary();}
                },
                error =>  console.error(<any>error)
                );
    }

    private _callCreateCasefiles () {
        // create the new casefiles
        this._casefileService.createCasefiles(this._myCase.id, this.filesToUpload)
            .then(
                (result) => {
                    console.log(result);
                    this.showSummary()
                },
                (error) => {
                    console.error(error);
                }
            );
    }

}
