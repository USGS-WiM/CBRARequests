import {Component}         from '@angular/core';
import {URLSearchParams}    from '@angular/http';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Case}              from './cases/case'
import {Property}          from './properties/property'
import {Requester}         from './requesters/requester';
import {Comment}           from './comments/comment';
import {CaseService}       from './cases/case.service';
import {CasefileService}   from './casefiles/casefile.service';
import {PropertyService}   from './properties/property.service';
import {RequesterService}  from './requesters/requester.service';
import {CommentService}    from './comments/comment.service';
import {APP_SETTINGS}      from './app.settings';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives:[REACTIVE_FORM_DIRECTIVES],
    providers: [
        PropertyService,
        RequesterService,
        CaseService,
        CasefileService,
        CommentService]
})
export class AppComponent {

    requestcase = {};
    requestproperty = {};
    requestrequester = {};

    private _filesToUpload = [];
    filesToUploadDetails: Object[] = [];
    active: Boolean = true;
    notready: Boolean = true;
    noxhr: Boolean = true;
    createNew: Boolean = false;
    alreadyExists: Boolean = false;
    doesnotExist: Boolean = false;
    filesNotReady: Boolean = false;
    fileUploadError: Boolean = false;
    fileTypeInvalid: Boolean = false;
    fileSizeInvalid: Boolean = false;
    invalidFile: string = "";
    invalidType: string = "";
    invalidSize: number;
    fileUploadMessages = [];
    salutations: string[] = APP_SETTINGS.SALUTATIONS;
    states: string[] = APP_SETTINGS.US_STATES;

    //private _today = new Date().toISOString().substr(0,10);

    private _myCase: Case;
    private _myProperty: Property;
    private _myRequester: Requester;

    caseForm: FormGroup;

    propertygroup: FormGroup;
    pstreet: FormControl = new FormControl("", Validators.required);
    punit: FormControl = new FormControl("");
    pcity: FormControl = new FormControl("", Validators.required);
    pstate: FormControl = new FormControl("");
    pzipcode: FormControl = new FormControl("", Validators.maxLength(5));
    subdivision: FormControl = new FormControl("");
    policy_number: FormControl = new FormControl("");

    requestergroup: FormGroup;
    salutation: FormControl = new FormControl("");
    first_name: FormControl = new FormControl("", Validators.required);
    last_name: FormControl = new FormControl("", Validators.required);
    organization: FormControl = new FormControl("");
    email: FormControl = new FormControl("");
    rstreet: FormControl = new FormControl("");
    runit: FormControl = new FormControl("");
    rcity: FormControl = new FormControl("");
    rstate: FormControl = new FormControl("");
    rzipcode: FormControl = new FormControl("", Validators.maxLength(5));

    casefilegroup: FormGroup;
    casefiles: FormControl = new FormControl("");

    constructor (fb: FormBuilder,
                private _caseService: CaseService,
                private _casefileService: CasefileService,
                private _propertyService: PropertyService,
                private _requesterService: RequesterService,
                private _commentService: CommentService
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
        this.alreadyExists = false;
        this.doesnotExist = false;
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
                    if (acase.length < 1) {
                        this.doesnotExist = true;
                    }
                    else {
                        this.doesnotExist = false;
                        this._myCase = acase[0];
                        this.requestcase = this._myCase;
                        document.getElementById("case_id").innerHTML = '';
                    }
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
            let selectedFile = selectedFiles[i];
            if (APP_SETTINGS.CONTENT_TYPES.indexOf(selectedFile.type) > -1) {
                if (selectedFile.size < APP_SETTINGS.MAX_UPLOAD_SIZE) {
                    this._filesToUpload.push(selectedFile);
                }
                else {
                    for (let k = 0; k < i; k++) {
                        this._filesToUpload.pop();
                    }
                    this.invalidSize = selectedFile.size;
                    this.invalidFile = selectedFile.name;
                    this.fileSizeInvalid = true;
                }
            }
            else {
                for (let k = 0; k < i; k++) {
                    this._filesToUpload.pop();
                }
                this.invalidType = selectedFile.type;
                this.invalidFile = selectedFile.name;
                this.fileTypeInvalid = true;
            }
        }
        for (let i = 0, f; f = this._filesToUpload[i]; i++) {
            let fileDetails = {'name': f.name, 'size': ((f.size)/1024/1024).toFixed(3), 'type': f.type};
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

    updatePStateControlValue(value) {
        this.pstate.updateValue(value);
    }

    updateRStateControlValue(value) {
        this.rstate.updateValue(value);
    }

    clearForm() {
        // reset the form
        this._myCase = null;
        this._myProperty = null;
        this._myRequester = null;
        this.active = false;
        setTimeout(()=> { this.notready = false; this.active=true; }, 1000);
    }

    repopulateRequester() {
        // repopulate the requester group fields
        this.salutation.updateValue(this._myRequester.salutation);
        this.first_name.updateValue(this._myRequester.first_name);
        this.last_name.updateValue(this._myRequester.last_name);
        this.organization.updateValue(this._myRequester.organization);
        this.email.updateValue(this._myRequester.email);
        this.rstreet.updateValue(this._myRequester.street);
        this.runit.updateValue(this._myRequester.unit);
        this.rcity.updateValue(this._myRequester.city);
        this.rstate.updateValue(this._myRequester.state);
        this.rzipcode.updateValue(this._myRequester.zipcode);
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
        for (let group of newrequest) {
            for (let key of group) {
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
                        this.alreadyExists = false;
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
                        this.clearForm();
                        if (this.createNew) {this.showPropertyGroup();  this.repopulateRequester();} else {this.showSummary();}
                        this.notready = false;
                    }
                },
                error =>  console.error(<any>error)
            );
    }

    // TODO make this iterate over the _filesToUpload array, rather than one bulk POST, for better error management
    private _callCreateCasefiles () {
        // create the new casefiles
        let errorMessages = "";
        let errorFiles = "";
        this.filesNotReady = true;
        for (let i = 0; i < this._filesToUpload.length; i++) {
            let file = this._filesToUpload[i];
            if (APP_SETTINGS.CONTENT_TYPES.indexOf(file.type) > -1) {
                if (file.size < APP_SETTINGS.MAX_UPLOAD_SIZE) {
                    this._casefileService.createCasefile(this._myCase.id, file)
                        .then(
                            (result) => {
                                // the server successfully saved the file
                                this.fileUploadMessages.push("SUCCESS: File uploaded: " + file.name);
                                this.filesNotReady = false;
                            },
                            (error) => {
                                // the server encountered an invalid file or an error
                                let message = "ERROR: File not uploaded: " + file.name + " (" + ((file.size)/1024/1024).toFixed(3) + " MBs) (" + file.type + ")\n (REASON: " + error + ").";
                                this.fileUploadMessages.push(message);
                                errorMessages += message;
                                errorFiles += file.name;
                                this.filesNotReady = false;
                            }
                        );
                }
                else {
                    this.fileUploadMessages.push("WARNING: File not uploaded, file size too big: " + file.name + " (" + ((file.size)/1024/1024).toFixed(3) + " MBs)");
                    this.filesNotReady = false;
                }
            }
            else {
                this.fileUploadMessages.push("WARNING: File not uploaded, not a valid file type: " + file.name + " (" + file.type + ")");
                this.filesNotReady = false;
            }
        }
        if (errorMessages.length > 0) {
            let newcomment = "During the initial request the following file(s) failed to upload:\n";
            newcomment += errorFiles + "\n";
            newcomment += "This is the collection of error messages from the failed upload attempt(s):\n";
            newcomment += errorMessages;
            this._createComment(newcomment);
            this.fileUploadError = true;
        }
        else {
            this.fileUploadError = false;
        }
        this.clearForm();
        if (this.createNew) {this.showPropertyGroup(); this.repopulateRequester();} else {this.showSummary();}
        this.notready = false;
    }

    private _createComment(newcomment) {
        if (!newcomment) {return;}
        this._commentService.createComment(new Comment(this._myCase.id, newcomment))
            .subscribe(
                comment => console.log(comment),
                error =>  console.error(<any>error)
            );
    }

}
