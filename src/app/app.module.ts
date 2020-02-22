import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthenticationService } from './login/shared/authentication.service';
import { ProductService } from './carrito-compras/shared/products.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarritoComprasComponent,
    CheckoutComponent,
    ProductoDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    Angular2FontawesomeModule
  ],
  providers: [
    AuthenticationService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
