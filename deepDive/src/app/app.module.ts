import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { ChangeDetectionChildComponent, ChangeDetectionComponent } from './change-detection/change-detection.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ChangeDetectionComponent,
    ChangeDetectionChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
