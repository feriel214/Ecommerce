import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  userId:any;
  cartItems=0;
  private apiUrl = 'http://localhost:9000/api'; 
  productId:any;
  constructor( private http:HttpClient , private router:Router  ) { }

  getAllProducts(){
    return this.http.get(this.apiUrl+"/product");
  }

  getProductById(id:any){
    return this.http.get(this.apiUrl+"/product/"+id);
  }
  
  getImage(name:any){
    return this.http.get('http://localhost:9000/getimage/'+name);
  }

  getAllCategories() {
    return this.http.get(this.apiUrl+'/categories');
  }

  getCategoryById(id: any) {
    return this.http.get(`${this.apiUrl}/category/${id}`);
  }

  Logout(){
    this.cartItems=0;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.userId=null;
    this.router.navigate(['/home'])
  }
}
