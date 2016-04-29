import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Comment}        from './comment';
import {Observable}     from 'rxjs/Observable';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class CommentService {
    constructor (private http: Http) {}

    getComment (id: number | string) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
        
        return this.http.get(APP_SETTINGS.COMMENTS_URL+id+'/', options)
            .map(res => <Comment> res.json())
            .catch(this.handleError);
    }
  
    getComments (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS, search: searchArgs });
        
        return this.http.get(APP_SETTINGS.COMMENTS_URL, options)
            .map(res => <Comment[]> res.json())
            .catch(this.handleError);
    }

    createComment (comment: Comment) : Observable<Comment> {
        let acomment = {'case': comment.caseid, 'comment': comment.comment};
        let body = JSON.stringify(acomment);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
        //let options = new RequestOptions({headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) });

        return this.http.post(APP_SETTINGS.COMMENTS_URL, body, options)
            .map(res => <Comment> res.json())
            .catch(this.handleError)
    }
    
    updateComment (comment: Comment) : Observable<Comment> {
        // pull out the ID
        let id = comment.id;
        delete comment['id'];
        
        let body = JSON.stringify(comment);
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });
        
        return this.http.put(APP_SETTINGS.COMMENTS_URL+id+'/', body, options)
            .map(res => <Comment> res.json())
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