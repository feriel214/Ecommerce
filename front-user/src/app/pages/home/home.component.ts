import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
 
  products: any[] = []; // Initialize with an empty array
  product:any;
  categories: any[] = [];
  selectedCategory: string = 'All';
  showCarousel = false; // Toggle to display products as a carousel
  showCarousel2  = false;
  constructor(private shared:SharedService,
              private router:Router , 
              private actRoute:ActivatedRoute , 
              private authService:AuthService,
              private cartService:CartService){

  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllCartProducts();
  }
  addToCart(productId:any){
    this.shared.productId=productId;
    console.log("user ",localStorage.getItem('userId'));
    if(localStorage.getItem('userId')== undefined){
      Swal.fire(
        'Vous devez connectée pou pouvoir ajouter un produit au panier !!!',
       
      )
    }else{
      let cartUser={
        "user":{"_id":localStorage.getItem('userId')},
        "productId": productId,
        "quantity": 1
      }
      this.cartService.addItemToCart(cartUser).subscribe((res:any)=>{
        this.getAllCartProducts();
        Swal.fire(
          'Produit Ajoutée au panier!',
          
        )
      })
    }
   
   

  }
  // Function to filter products based on the selected category
  filterProducts(category: string): void {
    this.selectedCategory = category;
  }
  getAllProducts(){
    this.shared.getAllProducts()
    .subscribe((res:any)=>{
      this.products=res;

        // Set a threshold for the number of products to trigger the carousel
        const carouselThreshold = 8; // Adjust as needed
        this.showCarousel = this.products.length > carouselThreshold;
        const carouselThreshold2 = 24;
        this.showCarousel2 = this.products.length > carouselThreshold2;
     })
  }


  getAllCategories(){
    this.shared.getAllCategories()
    .subscribe((res:any)=>{
      console.log("res",res)
      this.categories=res.categories;
    })
  }


  getProductById(){
    this.shared.getProductById(this.shared.productId)
    .subscribe((res:any)=>{
      console.log("user edit ",res)
      this.product=res;
    
    })
  }

  getAllCartProducts(){
    let userId=localStorage.getItem('userId');
     this.cartService.getUserCart(userId)
     .subscribe((res:any)=>{
       this.shared.cartItems=res.items.length;
     })
  }

}
