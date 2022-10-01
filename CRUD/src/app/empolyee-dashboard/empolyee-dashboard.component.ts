import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './empolyee-dashboard.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {HardcodedAuthenticationService} from '../shared/hardcoded-authentication.service'


@Component({
  selector: 'app-empolyee-dashboard',
  templateUrl: './empolyee-dashboard.component.html',
  styleUrls: ['./empolyee-dashboard.component.css']
})
export class EmpolyeeDashboardComponent implements OnInit {
name='';
  formValue ! : FormGroup;
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  /*constructor(private route: ActivatedRoute,private formbuilder: FormBuilder,
    private router: Router,private api : ApiService,private hardcodedAuthenticationService: HardcodedAuthenticationService) { }*/

  employeeModelObj :EmployeeModel = new EmployeeModel();
constructor(private formbuilber: FormBuilder,private api : ApiService,private router: Router,private route: ActivatedRoute,private hardcodedAuthenticationService: HardcodedAuthenticationService) { }
ngOnInit(): void {
  this.name= this.route.snapshot.params['name'];
this.formValue =this.formbuilber.group({
firstName : [''],
lastName : [''],
email :[''],
mobile:[''],
salary: ['']
})
this.getAllEmployee();
}
clickAddEmployee(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate =false;
  
}

postEmployeeDetails(){
  this.employeeModelObj.firstName = this.formValue.value.firstName;
  this.employeeModelObj.lastName = this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobile=this.formValue.value.mobile;
  this.employeeModelObj.salary=this.formValue.value.salary;
  
  this.api.postEmploye(this.employeeModelObj)
.subscribe(res=>{
console.log(res);
alert("Employee Added Successfully");
let ref= document.getElementById('cancel')
ref?.click();
this.formValue.reset();
this.getAllEmployee();
},
err=>{ 
alert("Something went wrong" )
})
  }

  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData = res;
    })

    }
    deleteEmployee(row: any){
      this.api.deleteEmploye(row.id)
      .subscribe(res=>{
        console.log(res);
        alert("Employee Deleted")
        this.getAllEmployee();
      })
    }
    onEdit(row: any)
    {
      this.showAdd = false;
      this.showUpdate =true;
      this.employeeModelObj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['salary'].setValue(row.salary);


    }
    updateEmployeeDetails(){
      this.employeeModelObj.firstName = this.formValue.value.firstName;
      this.employeeModelObj.lastName = this.formValue.value.lastName;
      this.employeeModelObj.email = this.formValue.value.email;
      this.employeeModelObj.mobile = this.formValue.value.mobile;
      this.employeeModelObj.salary = this.formValue.value.salary;
      this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
      .subscribe(res=>{
        alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      })
    }
    logout(){
      alert(" Logged Out! ")
      this.router.navigate(['logout']);
      this.hardcodedAuthenticationService.logout();
      
      
    }
    

    

}
