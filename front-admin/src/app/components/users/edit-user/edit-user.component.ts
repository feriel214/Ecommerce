import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit {
  id: any;
  user: any;
  constructor( private userService:UsersService , private router:Router , private actRoute:ActivatedRoute){
    
  }


  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id)
    .subscribe((res:any)=>{
      console.log("user edit ",res)
      this.user=res.user;
    })
  }


  update(){

    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifiez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.editUser(this.id,this.user)
        .subscribe((res : any )=>{
          Swal.fire(
            'Modifié !',
            'Votre utilisateur a été modifié.',
            'success'
          )
            this.router.navigate(['/dashboard/list/user'])
        })
       
      }
    })




  }

}
