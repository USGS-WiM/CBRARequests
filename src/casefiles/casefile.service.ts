import {Injectable}     from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class CasefileService {
    constructor (private http: Http) {}

    getCasefiles (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.CASEFILES_URL, options)
            .toPromise()
            .then(res => res.json())
            .catch(this._handleError);
    }

    createCasefile(caseid: number, file: File) {
        return new Promise((resolve, reject) => {
            let contentType = file.type;
            if (APP_SETTINGS.CONTENT_TYPES.indexOf(contentType) > -1) {
                if (file.size < APP_SETTINGS.MAX_UPLOAD_SIZE) {
                    let formData:any = new FormData();
                    formData.append("case", caseid);
                    formData.append("file", file);
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 201) {
                                resolve(JSON.parse(xhr.response) + "\n");
                            } else {
                                reject(xhr.response);
                            }
                        }
                    };
                    xhr.open("POST", APP_SETTINGS.CASEFILES_URL, true);
                    //xhr.setRequestHeader("Content-Type", contentType);
                    //xhr.setRequestHeader("Authorization", "Basic " + btoa(sessionStorage.getItem('username') + ":" + sessionStorage.getItem('password')));
                    xhr.setRequestHeader(
                        'Authorization', 'Basic ' +
                        btoa(
                            (sessionStorage.getItem('username') ? sessionStorage.getItem('username') : 'public') + ':' +
                            (sessionStorage.getItem('password') ? sessionStorage.getItem('password') : 'public')
                        )
                    );
                    xhr.send(formData);
                }
                else {
                    reject("ERROR: File size too big. " + file.name + " (" + ((file.size)/1024/1024).toFixed(3) + " MBs).");
                }
            }
            else {
                reject("ERROR: Not a valid file type. " + file.name + " (" + file.type + ").");
            }
        });
    }

    private _handleError (error: any) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error via Casefile Service');
    }
}
