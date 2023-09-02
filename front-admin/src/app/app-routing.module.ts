import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userPages/login/login.component';
import { SignupComponent } from './userPages/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { DashboardOpComponent } from './components/dashboard-op/dashboard-op.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup' , component: SignupComponent},
  {path : 'dashboard',component:DashboardComponent , canActivate: [AuthGuard],
  children: [
    {path:'add/user' , component: AddUserComponent},
    {path:'list/user' , component: ListUserComponent},
    {path:'edit/user/:id' , component: EditUserComponent},
    {path:'add/product' ,component: AddProductComponent},
    {path:'list/product' , component: ListProductComponent},
    {path:'edit/product/:id' , component: EditProductComponent},
    {path:'category' , component: CategorieComponent},
    {path:'orders',component:OrdersComponent},
    {path:'order/details/:id',component:OrdersDetailsComponent},
  
  ]

  },
  {path:'dashboardop',component : DashboardOpComponent , canActivate: [AuthGuard],
  children: [
    {path:'add/product' ,component: AddProductComponent},
    {path:'list/product' , component: ListProductComponent},
    {path:'edit/product/:id' , component: EditProductComponent},
    {path:'category' , component: CategorieComponent},
 
  ]
},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
