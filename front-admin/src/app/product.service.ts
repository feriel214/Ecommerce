import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9000/api'; 
  constructor( private http:HttpClient ) { }

  getAllProducts(){
    return this.http.get(this.apiUrl+"/product");
  }

  getProductById(id:any){
    return this.http.get(this.apiUrl+"/product/"+id);
  }
  addProduct(product : any){
    return this.http.post(this.apiUrl+"/",product);
  }

  editProduct(id : any , product:any){
    return this.http.put(this.apiUrl+"/product/"+id,product);
  }

  deleteProduct(id:any){
    return this.http.delete(this.apiUrl+"/product/"+id);
  }

  getImage(name:any){
    return this.http.get('http://localhost:9000/getimage/'+name);
  }
}
