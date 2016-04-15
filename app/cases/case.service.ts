import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Case}           from './case';
import {Observable}     from 'rxjs/Observable';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class CaseService {
    constructor (private http: Http) {}

    getCase (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.CASES_URL+id+'/', options)
            .map(res => <Case> res.json())
            .catch(this.handleError);
    }
    
    getCases (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.CASES_URL, options)
            .map(res => <Case[]> res.json())
            .catch(this.handleError);
    }
    
    createCase (acase: Case) : Observable<Case> {
        let body = JSON.stringify(acase);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.post(APP_SETTINGS.CASES_URL, body, options)
            .map(res => <Case> res.json())
            .catch(this.handleError)
    }
    
    updateCase (acase: Case) : Observable<Case> {
        // pull out the ID
        let id = acase.id;
        delete acase['id'];

        let body = JSON.stringify(acase);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.put(APP_SETTINGS.CASES_URL+id+'/', body, options)
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