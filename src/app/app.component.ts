import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';

  constructor(public authenticationService:AuthenticationService , private route:ActivatedRoute){

  }

  email:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) =>{
      console.log(params);
      this.email = params.data;
    })
   
    
    
  }

  
   logout(){
    this.authenticationService.logout();
   }


}
