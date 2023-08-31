import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
  cartItems:any;
  total:any;
  constructor(private shared:SharedService,private router:Router,private cartService:CartService ){

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
       this.shared.cartItems=res.items.length;
       this.total=res.total;
       console.log(" this.cartItems", this.cartItems);
     })
  }


  removeItemCart(itemId:any){
      Swal.fire({
        title: 'Voulez-vous supprimer ce produit du cart ?', // Change "Utilisateur" to "Produit"
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
      }).then((result : any) => {

        if (result.isConfirmed) {
          let userId=localStorage.getItem('userId');
          this.cartService.delteItemFromCart(itemId,userId)
          .subscribe((res:any)=>{
            this.getAllCartProducts();
            Swal.fire(
              'Supprimé!',
              'Produit a été supprimé avec succès.', // Change "Utilisateur" to "Produit"
              'success'
            );
          })
        
          }
      })
       
  }

  updateItemQuantity(event : any,itemId:any){
       Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir modifier la quantité ?', // Change "utilisateur" to "produit"
        text: 'Vous ne pourrez pas revenir en arrière !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          let userId=localStorage.getItem('userId');
          let obj={
            "itemId": itemId,
            "quantity": event.target.value
          }
          // You may need to update this to edit a product
            this.cartService.UpdateItemCart(userId,obj)
            .subscribe((res:any)=>{
              this.getAllCartProducts();
              Swal.fire(
                'Modifié!',
                'Quantité a été modifiée avec succès.', // Change "Utilisateur" to "Produit"
                'success'
              );
            })

        }
      });
  }
}
