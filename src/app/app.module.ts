import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import routing module
import {AppRoutingModule} from './app-routing-module'

// Get Account detail
import {AccountService} from './account.service';
import {AccountDetailComponent} from './account-detail/account-detail.component'

// Orderby 
import {OrderByGamePlayed} from './orderpipe-gameplayed'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountDetailComponent,
    OrderByGamePlayed
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
