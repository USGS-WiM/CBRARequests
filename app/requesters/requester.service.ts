import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Requester}      from './requester';
import {Observable}     from 'rxjs/Observable';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class RequesterService {
    constructor (private http: Http) {}

    getRequester (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.REQUESTERS_URL+id+'/', options)
            .map(res => <Requester> res.json())
            .catch(this.handleError);
    }
  
    getRequesters (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.REQUESTERS_URL, options)
		    .map(res => <Requester[]> res.json())
		    .catch(this.handleError);
    }

    createRequester (requester: Requester) : Observable<Requester> {
        let body = JSON.stringify(requester);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
  
        return this.http.post(APP_SETTINGS.REQUESTERS_URL, body, options)
            .map(res => <Requester> res.json())
            .catch(this.handleError)
    }

    updateRequester (requester: Requester) : Observable<Requester> {
        // pull out the ID
        let id = requester.id;
        delete requester['id'];

        let body = JSON.stringify(requester);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
        //let options = new RequestOptions({headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) });


        return this.http.put(APP_SETTINGS.REQUESTERS_URL+id+'/', body, options)
            .map(res => <Requester> res.json())
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