import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/LoginResponse';
import { LoginService } from '../services/login.service';
import { SellerResponse } from 'app/model/SellerResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  Result : SellerResponse =new SellerResponse();
  active=false;
  constructor(private formBuilder: FormBuilder,private service:LoginService,private route:Router) { 
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
  
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
    let data={
      username : this.messageForm.value.name,
      password :this.messageForm.value.message,
    }
    this.service.doLogin(data).then((par:SellerResponse) =>{
        
        sessionStorage.setItem('username',data.username);
        sessionStorage.setItem('_id',par._id.toString());
        sessionStorage.setItem('lastName',par.lastName);
        sessionStorage.setItem('firstName',par.firstName);
        
      
      console.log(par)
      this.Result=par;
      if(par.role=='admin'){
        this.route.navigate(['/gestion']);
      }
      else{
        this.route.navigate(['/sale']);

      }

    });

  }

  ngOnInit() {

  }

}
