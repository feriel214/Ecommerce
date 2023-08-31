import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { OrderService } from 'src/app/order.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems:any;
  total:any;
  userId:any;
  order={
    "_id":"",
    "products":[
      {
        "product": "",
        "quantity": 0
      }
    ],
    "firstName":"",
    "lastName":"",
    "shipmentDetails":{
      "country":"",
      "address":"",
      "city":"",
      "countryState":"",
      "postalCode":"",
 
    },
    "phone":"",
    "email":"",
    "noteAboutOrder":"",
    "total":"",
    "paymentMethod": {
      "cheque": false,
      "cash": false
    }
  };
  formData: any = {};
  constructor(private shared:SharedService,private router:Router,private cartService:CartService ,private orderService:OrderService ){

  }
  ngOnInit(): void {
    this.getAllCartProducts();
    
  }


  getAllCartProducts(){
    let userId=localStorage.getItem('userId');
     this.cartService.getUserCart(userId)
     .subscribe((res:any)=>{
      console.log("***res",res)
       this.cartItems=res.items;
       this.total=res.total;
       this.userId=res.user;
       console.log(" this.cartItems", this.cartItems);
     })
  }

  createOrder(){
    Swal.fire({
      title: 'Voulez-vous passer cette commande ?', // Updated message
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, passer la commande', // Updated message
      cancelButtonText: 'Annuler',
    }).then((result: any) => {
      if (result.isConfirmed) {
        //let userId = localStorage.getItem('userId');
        this.order["_id"]=this.userId;
        this.order.products=this.cartItems;
        this.order.total=this.total;

        console.log("order ****",this.order);
        this.orderService.addOrder(this.order)
        .subscribe((res:any)=>{
            //vider la carte id 
            this.cartService.deleteCart(this.userId)
           
            .subscribe((res:any)=>{
              Swal.fire(
                'Commande passée!', // Updated message
                'La commande a été passée avec succès.', // Updated message
                'success'
              );
              this.shared.cartItems=0
              this.router.navigate(['/home'])
            })
        
        })



      }
    })
    
  } 

  
}
