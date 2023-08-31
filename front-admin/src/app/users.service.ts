import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:9000/api'; // Update with your API URL

  constructor(private http: HttpClient , private router: Router) { }

  getAllUsers() {

    return this.http.get(`${this.apiUrl}/allusers`)
      
  }

  deleteUser(id:any){
    return this.http.delete(this.apiUrl+`//admin/user/delete/${id}`)
  }

  getUserById(id:any){
   return this.http.get(this.apiUrl+'/user/'+id);  
  }


  editUser(id:any , user:any){
    return this.http.put(this.apiUrl+`/user/edit/${id}`,user);
  }

  addUser(user:any){
    return this.http.post(this.apiUrl+'/signup',user);
  }
}
