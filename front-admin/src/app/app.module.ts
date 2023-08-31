import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './userPages/login/login.component';
import { SignupComponent } from './userPages/signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    AddUserComponent,
    ListUserComponent,
    EditUserComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    CategorieComponent,
    OrdersComponent,
    OrdersDetailsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserModule,
    RouterModule.forRoot([]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
