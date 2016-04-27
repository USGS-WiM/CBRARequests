import {Injectable}     from 'angular2/core';
import {Headers} from 'angular2/http';

@Injectable()
export class APP_SETTINGS {
    //private static _API_ENDPOINT: string = 'http://localhost:8000/cbraservices/';
    private static _API_ENDPOINT: string = 'http://' + window.location.hostname + '/cbra/cbraservices/';

    public static get AUTH_URL(): string { return this._API_ENDPOINT+'auth/' };
    public static get CASES_URL(): string { return this._API_ENDPOINT+'cases/' };
    public static get PROPERTIES_URL(): string { return this._API_ENDPOINT+'properties/' };
    public static get REQUESTERS_URL(): string { return this._API_ENDPOINT+'requesters/' };
    public static get CASEFILES_URL(): string { return this._API_ENDPOINT+'casefiles/' };
    public static get COMMENTS_URL(): string { return this._API_ENDPOINT+'comments/' };
    public static get TAGS_URL(): string { return this._API_ENDPOINT+'tags/' };
    public static get CASETAGS_URL(): string { return this._API_ENDPOINT+'casetags/' };
    public static get SYSTEMUNITS_URL(): string { return this._API_ENDPOINT+'systemunits/' };
    public static get FIELDOFFICES_URL(): string { return this._API_ENDPOINT+'fieldoffices/' };
    public static get SYSTEMMAPS_URL(): string { return this._API_ENDPOINT+'systemmaps/' };
    public static get USERS_URL(): string { return this._API_ENDPOINT+'users/' };
    public static get DETERMINATIONS_URL(): string { return this._API_ENDPOINT+'determinations/' };
    public static get SYSTEMUNITPROHIBITIONDATES_URL(): string { return this._API_ENDPOINT+'systemunitprohibitiondates/' };

    public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
    public static get AUTH_HEADERS() { return new Headers({
        'Authorization': 'Basic ' +
        btoa((sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'public') + ':' +
            (sessionStorage.getItem('password') ? sessionStorage.getItem('password') : 'public'))
    }) };
    public static get AUTH_JSON_HEADERS() { return new Headers({
        'Authorization': 'Basic ' +
        btoa((sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'public') + ':' +
            (sessionStorage.getItem('password') ? sessionStorage.getItem('password') : 'public')),
        'Accept': 'application/json', 'Content-Type': 'application/json' }
    )};

    public static get SALUTATIONS(): string[] { return ['Mr.', 'Ms.', 'Dr.'] };
    public static get US_STATES(): string[] { return ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"] };

}