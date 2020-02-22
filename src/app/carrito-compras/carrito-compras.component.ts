import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './shared/products.service';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './shared/shoppingcart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  public products: Product[] = [];
  public shoppingCartItems: ShoppingCartItem[] = [];
  
  constructor(
    private service: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));
    let response: Observable<Product[]> = this.service.getProducts();
    response.subscribe((products: Product[]) => 
    {
      products.forEach((p: Product) =>
      {
        let amount: number = 0;
        this.shoppingCartItems.forEach((i: ShoppingCartItem) =>
        {
          if (p.id == i.product.id)
          {
            amount = amount + i.amount;
          }
        });
        p.unidades = p.unidades - amount;
        this.products.push(p);
      })
    });
  }

  public OpenCheckout(event: any)
  {
    if (this.shoppingCartItems.length > 0)
    {
      this.router.navigate(['/checkout']);
    }
    else
    {
      alert("El carrito de compras está vacío");
    }
  }

  public OpenDetalle(event: any, productId: number)
  {
    this.router.navigate(["/detalle", productId]);
  }

  public Logout(event: any)
  {
    this.router.navigate(["/"]);
  }

  public Back(event: any)
  {
    this.router.navigate(["/list"]);
  }

  public Add(event: any, product: Product)
  {
    let element = (<HTMLInputElement>document.getElementById(`p${product.id}`)).value;
    let amount: number = 1;
    
    if (element !== null && element !== undefined && parseInt(element))
    {
      amount = parseInt(element);
    }
    this.products.forEach((p: Product) =>
    {
      if (p.id == product.id)
      {
        if (p.unidades >= amount)
        {
          p.unidades = p.unidades - amount;

          for(var i = 0; i < amount; i++)
          {
            let item: ShoppingCartItem = new ShoppingCartItem(product, 1);
            this.shoppingCartItems.push(item);
          }
          localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCartItems));
        }
        else
        {
          alert("El monto no puede superar al disponible");
        }
      }
    });
  }
}
