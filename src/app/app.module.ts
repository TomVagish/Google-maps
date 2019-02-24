import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {HttpModule} from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ'
    }),
    AgmJsMarkerClustererModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
