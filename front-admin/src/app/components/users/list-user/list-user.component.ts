import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  
  users:any;
  filterText:any;

  constructor(private userService:UsersService, private router :Router){}
  ngOnInit(): void {
   this.getAllUsers();

  
  }

 
  deleteUser(idUser:any){
    Swal.fire({
      title: 'Voulez-vous supprimer cet utilisateur ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(idUser)
        .subscribe((res:any)=>{
           this.getAllUsers();
        })
        Swal.fire(
          'Supprimé!',
          'Utilisateur à été supprimée avec succées.',
          'success'
        )
      }
    })
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe((res : any)=>{
      console.log("all users",res.users)
      this.users=res.users;
    })

  }

  editUser(idUser: any) {

    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir modifier cet utilisateur ? ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {

        this.router.navigate([`/dashboard/edit/user/${idUser}`]);
       
      }
    })
 
  }

  AddUser(){
    this.router.navigate([`/dashboard/add/user`]);
  }
 

}
