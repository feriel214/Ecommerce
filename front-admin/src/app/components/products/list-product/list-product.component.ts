import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  
  products:any;

  constructor(private productService:ProductService, private router :Router){}
  ngOnInit(): void {
   this.getAllProducts();

  }

  getAllProducts(){
     this.productService.getAllProducts()
     .subscribe((res:any)=>{
      console.log("res all products",res)
      this.products=res;
     })
  }

  editProduct(idProduct : any){
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir modifier ce produit ?', // Change "utilisateur" to "produit"
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([`/dashboard/edit/product/${idProduct}`]); // You may need to update this to edit a product
      }
    });
  }
  deleteProduct(idProduct : any){
    console.log("idProduct",idProduct)
    Swal.fire({
      title: 'Voulez-vous supprimer ce produit ?', // Change "Utilisateur" to "Produit"
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result : any) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(idProduct).subscribe((res=>{
          this.getAllProducts();
          Swal.fire(
            'Supprimé!',
            'Produit a été supprimé avec succès.', // Change "Utilisateur" to "Produit"
            'success'
          );
        }))
       
      }
    });
    
  }

  Addproduct(){
    this.router.navigate([`/dashboard/add/product`]);
  }
}
