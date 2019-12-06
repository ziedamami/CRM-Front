import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SellerResponse } from '../model/SellerResponse';
import { catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:8080/api";


@Injectable({
  providedIn: 'root'
})

export class SellerService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getSellers (): Observable<SellerResponse[]> {
    return this.http.get<SellerResponse[]>(apiUrl+"/all_sellers")
      .pipe(
        tap(heroes => console.log('fetched sellers')),
        catchError(this.handleError('getSells', []))
      );
  }

  getSeller(id): Observable<SellerResponse> {
    const url = `${apiUrl}/seller/${id}`;
    return this.http.get<SellerResponse>(url).pipe(
      tap(_ => console.log(`fetched seller id=${id}`)),
      catchError(this.handleError<SellerResponse>(`getSeller id=${id}`))
    );
  }

  deleteSeller(id): Observable<SellerResponse> {
    const url = `${apiUrl}/delete_seller/${id}`;

    return this.http.delete<SellerResponse>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted seller id=${id}`)),
      catchError(this.handleError<SellerResponse>('deleteSeller'))
    );
  }

  updateSeller(id, seller): Observable<any> {
    const url = `${apiUrl}/update_seller/${id}`;
    return this.http.put(url, seller, httpOptions).pipe(
      tap(_ => console.log(`updated seller id=${id}`)),
      catchError(this.handleError<any>('updateSeller'))
    );
  }

  addSeller(seller): Observable<any> {
    const url = `${apiUrl}/add_seller`;
    return this.http.post(url, seller, httpOptions).pipe(
      tap(_ => console.log(`added seller `)),
      catchError(this.handleError<any>('addSeller'))
    );
  }

}
