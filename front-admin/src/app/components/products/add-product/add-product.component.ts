import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit  {
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

  constructor(private productService:ProductService ,private categoryService :CategoryService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllCategories();
  }

  selectFile(event: any){
    this.myFile = event.target.files[0];  
  }

  addProduct(){
    let myFormData = new FormData();
    myFormData.append('title' , this.product.title );
    myFormData.append('slug' , this.product.slug );
    myFormData.append('description' , this.product.description );
    myFormData.append('price' , this.product.price.toString() );
    myFormData.append('category' , this.product.category );
    myFormData.append('brand' , this.product.brand );
    myFormData.append('quantity' , this.product.quantity.toString() );
    myFormData.append('image' , this.myFile  );

    this.productService.addProduct(myFormData)
    .subscribe((res : any )=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Produit Ajoutée avec Succées ! ',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard/list/product'])
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
