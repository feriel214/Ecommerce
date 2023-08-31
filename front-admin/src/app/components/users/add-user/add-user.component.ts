import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  user={
    firstName:'',
    lastName:'',
    email:'',
    password:''
  };
  constructor( private userService:UsersService , private router:Router ){
    
  }

  addUser(){
console.log("user",this.user)
    this.userService.addUser(this.user)
        .subscribe((res : any )=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Utilisateur Ajoutée avec Succées ! ',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/dashboard/list/user'])
        })




  }

}
