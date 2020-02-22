import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartItem } from '../carrito-compras/shared/shoppingcart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public shoppingCartItems: ShoppingCartItem[] = [];
  public total: number = 0.00;
  
  constructor(
    private router: Router 
  ) { }

  ngOnInit() {
    this.shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));
    this.total = 0.00;
    this.shoppingCartItems.forEach((item: ShoppingCartItem) =>
    {
      this.total = this.total + item.amount*item.product.valor;
    });
  }

  public OpenCatalog(event: any)
  {
    this.router.navigate(["/list"]);
  }

  public Logout(event: any)
  {
    this.router.navigate(["/"]);
  }

  public Buy(event: any)
  {
    localStorage.removeItem("shoppingCart");
    localStorage.setItem("shoppingCart", JSON.stringify([]));
    alert("Gracias por su compra");
    this.router.navigate(["/list"]);
  }
}