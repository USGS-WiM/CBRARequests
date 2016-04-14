import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Case}           from './case';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class CaseService {
    constructor (private http: Http) {}

    private _CasesUrl = 'http://localhost:8000/cbraservices/cases/';
    
    getCase (id: number | string) {
        return this.http.get(this._CasesUrl+id+'/')
            .map(res => <Case> res.json())
            .catch(this.handleError);
    }
  
    getCases (searchArgs?: URLSearchParams) {
        return this.http.get(this._CasesUrl, {search: searchArgs})
            .map(res => <Case[]> res.json())
            .catch(this.handleError);
    }

    createCase (acase: Case) : Observable<Case> {
        //let newcase = new Case(acase.request_date, acase.requester, acase.property, acase.casefiles, acase.id);
        let body = JSON.stringify(acase);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._CasesUrl, body, options)
            .map(res => <Case> res.json())
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}