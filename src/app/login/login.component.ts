import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/LoginResponse';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  Result : LoginResponse =new LoginResponse();
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
    this.service.doLogin(data).then((par:LoginResponse) =>{
      
        sessionStorage.setItem('username',data.username);
        sessionStorage.setItem('_id',par._id.toString());
        sessionStorage.setItem('lastName',par.lastName);
        sessionStorage.setItem('firstName',par.firstName);
        console.log(sessionStorage);
       this.route.navigate(['/gestion']);
      console.log(par)
      this.Result=par;

    });

  }

  ngOnInit() {

  }

}
