import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Requester}      from './requester';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class RequesterService {
    constructor (private http: Http) {}

    private _RequestersUrl = 'http://localhost:8000/cbraservices/requesters/';
  
    getRequesters (searchArgs?: URLSearchParams) {
        return this.http.get(this._RequestersUrl, {search: searchArgs})
            //.do(data => console.log(data)) //eyeball results in the console
		    .map(res => <Requester[]> res.json())
		    .catch(this.handleError);
    }

    createRequester (requester: Requester) : Observable<Requester> {
        /*let newrequester = new Requester(
            requester.first_name, requester.last_name, requester.salutation,
            requester.organization, requester.email, requester.street, requester.unit,
            requester.city, requester.state, requester.zipcode, requester.id);*/
        let body = JSON.stringify(requester);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
  
        return this.http.post(this._RequestersUrl, body, options)
            //.do(data => console.log(data)) //eyeball results in the console
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