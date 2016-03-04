import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Property}       from './property';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class PropertyService {
    constructor (private http: Http) {}

    private _PropertiesUrl = 'http://localhost:8000/cbraservices/properties/';
  
    getProperties (searchArgs?: URLSearchParams) {
        return this.http.get(this._PropertiesUrl, {search: searchArgs})
            .map(res => <Property[]> res.json())
            .do(data => console.log(data)) //eyeball results in the console
            .catch(this.handleError);
    }

    createProperty (property: Property) : Observable<Property> {
        /*let newproperty = new Property(
            property.street, property.city, property.state, property.zipcode,
            property.unit, property.subdivision, property.policy_number, property.id);*/
        let body = JSON.stringify(property);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._PropertiesUrl, body, options)
            .map(res => <Property> res.json())
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