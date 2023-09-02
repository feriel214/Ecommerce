import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  implements OnInit{
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
  searchText='';
  orders:any;
  filtredOrders:any
  constructor(private orderService:OrderService , private router:Router){

  }
  ngOnInit(): void {
    this.getAllOrders();
  }

  filterOrders() {
    this.filtredOrders = this.orders.filter((order: any) => {
      const searchTextLowerCase = this.searchText.toLowerCase();
  
      return (
        (order.user.firstName && order.user.firstName.toLowerCase().includes(searchTextLowerCase)) ||
        (order.user.lastName && order.user.lastName.toLowerCase().includes(searchTextLowerCase)) ||
        (order.user.email && order.user.email.toLowerCase().includes(searchTextLowerCase)) ||
        (order.total && order.total.toString().includes(searchTextLowerCase)) || // Filter by total
        (order.orderStatus && this.TranslatedStatus[order.orderStatus.indexOf(order.orderStatus)].toLowerCase().includes(searchTextLowerCase)) || // Filter by status
        (order.createdAt && order.createdAt.toLowerCase().includes(searchTextLowerCase)) // Filter by created date
      );
    });
  }

  getAllOrders(){
    this.orderService.getAllOrders()
    .subscribe((res:any)=>{
      this.orders=res;
      this.filtredOrders=res;
    })
  }

  updateOrderStatus(newStatus:any){
    this.orderService.updateOrderStatus(newStatus)
    .subscribe((res:any)=>{

    })
  }

  getOrderById(id:any){
    this.orderService.getOrderById(id)
    .subscribe((res:any)=>{

    })
  }

  onOrderStatusChange(selectedValue: string,orderId:any) {
    Swal.fire({
      title: 'Mettre à jour le statut de commande',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, mettez à jour !'
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.orderService.updateOrderStatus({"orderId":orderId, "orderStatus":selectedValue})
        .subscribe((res: any) => {
          this.getAllOrders();
       
          Swal.fire(
            'Modifiée !',
            'La catégorie a été modifiée avec succès.',
            'success'
          );
        });
      }
    });
    
  }


 deleteOrder(idOrder:any){
  Swal.fire({
    title: 'Supprimer commande',
    text: 'Cette action est irréversible !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.deleteOrder(idOrder)
        .subscribe((res: any) => {
          this.getAllOrders();
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
 
 orderDetails(idOrder:any){
  this.router.navigate([`/dashboard/order/details/${idOrder}`])
 }
}
