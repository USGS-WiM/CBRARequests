import {Injectable}     from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import {APP_SETTINGS}   from '../app.settings';

@Injectable()
export class CasefileService {
    constructor (private http: Http) {}

    getCasefiles (searchArgs?: URLSearchParams) {
        let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.CASEFILES_URL, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    createCasefiles(caseid: number, files: Array<File>) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < files.length; i++) {
                let formData: any = new FormData();
                formData.append("case", caseid);
                formData.append("file", files[i]);
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 201) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open("POST", APP_SETTINGS.CASEFILES_URL, true);
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
        });
    }

    private handleError (error: any) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error via Casefile Service');
    }
}