import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import {
  MatSliderModule,
  MatSlideToggleModule,
  MatButtonToggleModule
} from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { ShortestPathComponent } from "./components/shortest-path/shortest-path.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ShortestPathService } from "./service/shortest-path.service";

@NgModule({
  declarations: [AppComponent, ShortestPathComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    HttpClientModule
  ],
  providers: [ShortestPathService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
