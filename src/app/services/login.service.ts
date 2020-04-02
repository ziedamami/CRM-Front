import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/LoginResponse';
import { SellerResponse } from 'app/model/SellerResponse';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url='https://app-easy-crm.herokuapp.com/login';

  constructor(private  http: HttpClient, private router:Router) { 

  }

  
  doLogin(data) {
    const  params = new  HttpParams().set('username', data.username).set('password', data.password);
    console.log(data);
    return this.http.post<SellerResponse>(this.url,params).toPromise();
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('login');
    return !(user==null);
  }

  logOut(){
    sessionStorage.removeItem('login'); 
    this.router.navigate(['/login'])
  }
  }
  
