import "./polyfills.ts";
import {platformBrowserDynamic}  from '@angular/platform-browser-dynamic';
import {enableProdMode}    from '@angular/core';
import {environment}       from './environments/environment';
import {AppModule}         from './app.module';
import {APP_SETTINGS}      from './app.settings';

if (environment.production) {
    enableProdMode();
    APP_SETTINGS.environment = 'production';
}
else{
    APP_SETTINGS.environment = 'development';
}

platformBrowserDynamic().bootstrapModule(AppModule);
