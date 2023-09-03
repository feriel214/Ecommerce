import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  implements OnInit{
 
  categories: any[] = [];
  products: any[] = [];
  searchText:any;
  filteredProducts :any;
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  constructor(private shared:SharedService,private router:Router ){}
  filterProducts() {
    this.filteredProducts = this.products.filter((product: any) => {
      return (
        (product.title && product.title.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (typeof product.price === 'string' && product.price.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (typeof product.quantity === 'string' && product.quantity.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    });
  }
  

  getAllProducts(){
    this.shared.getAllProducts()
    .subscribe((res:any)=>{
      this.products=res;
      this.filteredProducts =res;
     })
  }

  getAllCategories(){
    this.shared.getAllCategories()
    .subscribe((res:any)=>{
      console.log("res",res)
      this.categories=res.categories;
    })
  }

}
