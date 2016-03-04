import {Injectable}     from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class CasefileService {
    constructor (private http: Http) {}

    private _CasefilesUrl = 'http://localhost:8000/cbraservices/casefiles/';

    getCases (searchArgs?: URLSearchParams) {
        return this.http.get(this._CasefilesUrl, {search: searchArgs})
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
                            console.log(xhr.response);
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open("POST", this._CasefilesUrl, true);
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