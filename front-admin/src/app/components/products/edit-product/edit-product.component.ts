import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: any;
  myFile: any;
  product = {
   title: '',
   slug: '',
   description: '',
   price: 0,
   category: '',
   brand: '',
   quantity: 0,
   image: '',
 };
 categories:any;
 existingImage :any;
 
 constructor(private productService:ProductService , private router:Router , private actRoute:ActivatedRoute,private categoryService:CategoryService ){

 }
 ngOnInit(): void {
  this.id = this.actRoute.snapshot.paramMap.get('id');
  this.productService.getProductById(this.id)
  .subscribe((res:any)=>{
    console.log("user edit ",res)
    this.product=res;
  
  })
  this.getAllCategories();
 }

 selectFile(event: any){
   this.myFile = event.target.files[0];  

 }



 editProduct(){


 Swal.fire({
  title: 'Êtes-vous sûr(e) ?',
  text: 'Vous ne pourrez pas revenir en arrière !',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui, modifiez-le !'
}).then((result : any) => {
  if (result.isConfirmed) {

    let myFormData = new FormData();
    myFormData.append('title' , this.product.title );
    myFormData.append('slug' , this.product.slug );
    myFormData.append('description' , this.product.description );
    myFormData.append('price' , this.product.price.toString() );
    myFormData.append('category' , this.product.category );
    myFormData.append('brand' , this.product.brand );
    myFormData.append('quantity' , this.product.quantity.toString() );
    myFormData.append('image', this.myFile);
   
   
    this.productService.editProduct(this.id,myFormData)
    .subscribe((res : any )=>{
     Swal.fire(
       'Modifié !',
       'Produit a été modifié.',
       'success'
     )
        this.router.navigate(['/dashboard/list/product'])
    })
  }
 
   
  })

}


getAllCategories(){
  this.categoryService.getAllCategories()
  .subscribe((res:any)=>{
    console.log("res",res)
    this.categories=res.categories;
  })
}



}
