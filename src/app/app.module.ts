import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import {HttpModule} from '@angular/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpLjFOXhx1hMJC7j-E3PevMYplBT9Q0NQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
