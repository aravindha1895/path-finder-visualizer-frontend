import { Injectable } from "@angular/core";
import { ShortestPathRequest } from "../model/ShortestPathRequestModel";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShortestPathService {
  url = "http://localhost:8080/getShortestPath";

  constructor(private http: HttpClient) {}

  getShortestPath(inputMatrix, noRows, noCols, i, j, x, y) {
    const ShortestPathRequestBean = new ShortestPathRequest(
      inputMatrix,
      noRows,
      noCols,
      i,
      j,
      x,
      y
    );
    
    // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    return this.http
      .post(this.url, JSON.stringify(ShortestPathRequestBean), {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8"
        })
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return Observable.throw(err.statusText);
        })
      );
  }
}
