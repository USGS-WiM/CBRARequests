import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {CaseService}       from './cases/case.service';
import {CasefileService}   from './casefiles/casefile.service';
import {CommentService}       from './comments/comment.service';
import {PropertyService}   from './properties/property.service';
import {RequesterService}  from './requesters/requester.service';
import {AppComponent}   from './app.component';

@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        CaseService, CasefileService, PropertyService, RequesterService, CommentService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
