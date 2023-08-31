import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:9000/orders/'; 
  constructor( private http:HttpClient ) { 

  }

  getAllOrders(){
    return this.http.get(this.apiUrl);
  }
  getOrderById(idOrder:any){
    return this.http.get(this.apiUrl+idOrder);
  }

  updateOrderStatus(orderStatus:any){
    return this.http.put(this.apiUrl+'update',orderStatus);
  }

  deleteOrder(idOrder:any){
    return this.http.delete(this.apiUrl+"delete/"+idOrder);
  }
}
