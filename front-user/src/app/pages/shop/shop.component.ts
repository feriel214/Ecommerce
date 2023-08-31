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
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  constructor(private shared:SharedService,private router:Router ){}




  getAllProducts(){
    this.shared.getAllProducts()
    .subscribe((res:any)=>{
      this.products=res;
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
