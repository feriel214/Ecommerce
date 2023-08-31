import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:9000/api/'; // Update the URL as needed

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(this.apiUrl+'categories');
  }

  getCategoryById(id: any) {
    return this.http.get(`${this.apiUrl}category/${id}`);
  }

  addCategory(category: any) {
    return this.http.post(this.apiUrl+'categories', category);
  }

  editCategory(id: any, category: any) {
    return this.http.put(`${this.apiUrl}category/edit/${id}`, category);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.apiUrl}category/delete/${id}`);
  }
}
