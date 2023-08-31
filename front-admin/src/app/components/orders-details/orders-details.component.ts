import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent  implements OnInit{
 
  orderId:any;
  oderDetails:any;
  orderStatuses = [ 'Not Processed','Cash on Delivery','Processing','Dispatched','Cancelled','Delivered'];
  TranslatedStatus= [ 'Non traité', 'Paiement à la livraison', 'Traitement', 'Expédié', 'Annulé', 'Livré'];
  statusColors : { [key: string]: string } = {
    'Not Processed' :"bg-gradient-dark",
    'Cash on Delivery':"bg-gradient-info",
    'Processing' :"bg-gradient-warning",
    'Dispatched':"bg-gradient-success",
    'Cancelled':"bg-gradient-danger",
    'Delivered':"bg-gradient-primary"
  
};
  constructor( private router:Router , private orderService:OrderService , private actRoute:ActivatedRoute){

  }

  
  ngOnInit(): void {
    this.orderId = this.actRoute.snapshot.paramMap.get('id');
    this.getOrderDetails(this.orderId);
  }


  getOrderDetails(orderId:any){
    this.orderService.getOrderById(orderId)
    .subscribe((res:any)=>{
      this.oderDetails=res;
    })
  }

}
