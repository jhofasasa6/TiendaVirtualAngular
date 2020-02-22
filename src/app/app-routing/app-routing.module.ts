import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "../login/login.component";
import { CarritoComprasComponent } from "../carrito-compras/carrito-compras.component";
import { CheckoutComponent } from '../checkout/checkout.component';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list', component: CarritoComprasComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'detalle/:id', component: ProductoDetalleComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  declarations: []
})
export class AppRoutingModule { }
