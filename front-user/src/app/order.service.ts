import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:9000/orders/'; // Update with your API URL
  LoggedInUser:any;
  constructor(private http: HttpClient ) { }


  addOrder(order:any){
    return this.http.post(this.apiUrl,order);
  }

 
}
