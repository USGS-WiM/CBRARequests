import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Property}       from './property';
import {Observable}     from 'rxjs/Observable';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class PropertyService {
    constructor (private http: Http) {}

    getProperty (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.get(APP_SETTINGS.PROPERTIES_URL+id+'/',options)
            .map(res => <Property> res.json())
            .catch(this.handleError);
    }
  
    getProperties (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.PROPERTIES_URL, options)
            .map(res => <Property[]> res.json())
            .catch(this.handleError);
    }

    createProperty (property: Property) : Observable<Property> {
        let body = JSON.stringify(property);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

        return this.http.post(APP_SETTINGS.PROPERTIES_URL, body, options)
            .map(res => <Property> res.json())
            .catch(this.handleError)
    }

    updateProperty (property: Property) : Observable<Property> {
        // pull out the ID
        let id = property.id;
        delete property['id'];

        let body = JSON.stringify(property);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
        //let options = new RequestOptions({headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) });


        return this.http.put(APP_SETTINGS.PROPERTIES_URL+id+'/', body, options)
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