import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:9000/cart/'; // Update with your API URL
  LoggedInUser:any;
  constructor(private http: HttpClient ) { }


  addItemToCart(item:any){
    return this.http.post(this.apiUrl+'add',item);
  } 
  UpdateItemCart(userId:any,item:any){
    return this.http.put(this.apiUrl+'update/'+userId,item);
  }
  delteItemFromCart(itemId:any , userId:any){
    console.log("del dhraaab .....")
    return this.http.delete(`${this.apiUrl}/delete/${itemId}/${userId}`);
  }
  getUserCart(user:any){
    return this.http.get(`${this.apiUrl}/${user}`);
  }

  deleteCart(idUser:any){
    return this.http.delete(`${this.apiUrl}/delete/${idUser}`);
  }
}
