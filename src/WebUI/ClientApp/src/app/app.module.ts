import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { TodoComponent } from './todo/todo.component';
import { TokenComponent } from './token/token.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TimeTrackingComponent} from "./time-tracking/time-tracking.component";
import {TimeTrackingDialogComponent} from "./time-tracking/time-tracking-dialog/time-tracking-dialog.component";
import {BsDatepickerModule, BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import {AlertConfig} from "ngx-bootstrap/alert";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {DurationPipe} from "./time-tracking/shared/duration.pipe";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    TodoComponent,
    TokenComponent,
    TimeTrackingComponent,
    TimeTrackingDialogComponent,
    DurationPipe,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }, AlertConfig, BsDatepickerConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
