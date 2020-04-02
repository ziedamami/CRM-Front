import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SaleResponse } from '../model/SaleResponse';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private param:SaleResponse;

  constructor(private http:HttpClient) { }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  getAllSales (): Observable<SaleResponse[]> {
    return this.http.get<SaleResponse[]>('https://app-easy-crm.herokuapp.com/api/all_sales/')
      .pipe(
        tap(heroes => console.log('fetched slaes')),
        catchError(this.handleError('getsales', []))
      );
  }

  getAllSalesbySeller (id): Observable<SaleResponse[]> {
    return this.http.get<SaleResponse[]>('https://app-easy-crm.herokuapp.com/api/seller_sales/'+id)
      .pipe(
        tap(heroes => console.log('fetched sales')),
        catchError(this.handleError('getsales', []))
      );
  }

  addSale(sale): Observable<any> {
    const url = `https://app-easy-crm.herokuapp.com/api/add_sale`;
    return this.http.post(url, sale, httpOptions).pipe(
      tap(_ => console.log(`added sale `)),
      catchError(this.handleError<any>('addsale'))
    );
  }

 
  }
  

