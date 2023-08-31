import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
 categories:any;
 filterText:any;
 state = false;
 categId:any;
 categ={
  name:'',
  description:''
 }
  constructor(private categoryService:CategoryService ,private router: Router){
    
  }
  ngOnInit(): void {
   this.getAllCategories();
  }


  AddCategory(){
    this.state=false;
    this.categoryService.addCategory(this.categ)
    .subscribe((res:any)=>{
      this.getAllCategories();
      this.categ={
        name:'',
        description:''
       }
       Swal.fire(
        'Ajoutée !',
        'Catégorie a été ajoutée avec succès.',
        'success'
      );
    })

  }

  editCategory(categId:any){
     this.categoryService.getCategoryById(categId)
     .subscribe((res:any)=>{
      this.categId=categId;
      this.state=true;
      this.categ.name=res.category.name;
      this.categ.description=res.category.description;
     })


   
  }

  updateCategory(){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir modifier cette catégorie ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifiez-la !'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("id , categ ", this.categId,this.categ)
       this.categoryService.editCategory(this.categId,this.categ)
       .subscribe((res:any)=>{
          this.getAllCategories();
          this.categ={
            name:'',
            description:''
          }
          Swal.fire(
            'Modifiée !',
            'La catégorie a été modifiée avec succès.',
            'success'
          );
        })
       
      }
    });
    
  }

  deleteCategory(categId:any){
    Swal.fire({
      title: 'Voulez-vous supprimer cette catégorie ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categId)
          .subscribe((res: any) => {
            this.getAllCategories();
          }, (error) => {
            Swal.fire(
              'Erreur',
              'Une erreur est survenue lors de la suppression de la catégorie.',
              'error'
            );
          });
    
        Swal.fire(
          'Supprimée!',
          'La catégorie a été supprimée avec succès.',
          'success'
        );
      }
    });
    
  }

  getAllCategories(){
    this.categoryService.getAllCategories()
    .subscribe((res:any)=>{
      console.log("res",res)
      this.categories=res.categories;
    })
  }
}
