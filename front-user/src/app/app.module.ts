import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SetBackgroundDirective } from './set-background.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StrikeComponent } from './strike/strike.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetBackgroundDirective,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    StrikeComponent,
    ShopComponent,
    BlogComponent,
    BlogDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
