import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInData } from '../model/signinData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormInvalid=false;
  areCredentialsInvalid=false;

  constructor(private authenticationService : AuthenticationService,private route:Router) { }
 
  ngOnInit(): void {
  }

  onSubmit(signInForm:NgForm){
    if(!signInForm.valid){
        this.isFormInvalid=true;
        this.areCredentialsInvalid=false;
        return;
    }
    console.log(signInForm.value);
    this.checkCredentials(signInForm);
    

  }
  private checkCredentials(signInForm:NgForm){
    const signInData = new SignInData(signInForm.value.email,signInForm.value.password);
    if(!this.authenticationService.authenticate(signInData)){
      this.isFormInvalid=false;
      this.areCredentialsInvalid=true;

    }
  }

  
  


}
