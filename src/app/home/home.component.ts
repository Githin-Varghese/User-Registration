import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';
import { FormBuilder , FormGroup} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formValue!: FormGroup; 

  userobj: UserModel = new UserModel;

  alluser: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private route:ActivatedRoute,private formBuilder:FormBuilder, private api:ApiService ){}
  email:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) =>{
      console.log(params);
      this.email = params.data;
    })

    this.formValue = this.formBuilder.group({
      name:[''],
      department:[''],
      email:[''],
      address:[''],
      city:[''],
      password:['']
    })
    this.AllUser();
   
    
    
  }

  AddUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.name = this.formValue.value.name;
    this.userobj.email = this.formValue.value.email;
    this.userobj.password = this.formValue.value.password;
    this.userobj.department = this.formValue.value.department;

    this.api.postUser(this.userobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllUser();
      this.formValue.reset();
    } })

  }

  AllUser(){
    this.api.getUser().subscribe(res => {
      this.alluser = res;
    })
  }

  EditUser(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['department'].setValue(data.department);
    this.formValue.controls['password'].setValue(data.password);
    this.userobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.name = this.formValue.value.name;
    this.userobj.email = this.formValue.value.email;
    this.userobj.password = this.formValue.value.password;
    this.userobj.department = this.formValue.value.department;
    this.api.putUser(this.userobj,this.userobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllUser();
      this.SaveShowBtn();
    })


  }


  DeleteUser(data:any){
    this.api.deleteUser(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllUser();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



  

  
  
}



