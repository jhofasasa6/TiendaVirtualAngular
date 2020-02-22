import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCartItem } from '../carrito-compras/shared/shoppingcart.service';
import { Product, ProductService } from '../carrito-compras/shared/products.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {
  public shoppingCartItems: ShoppingCartItem[] = [];
  public product: Product;
  public id: number;
  private sub: any;
  
  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private service: ProductService
  ) { }

  ngOnInit() {
    this.sub = this.activateRouter.params.subscribe(params =>
      {
        this.id = +params['id'];
      });
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
        
        if (this.id == p.id)
        {
          this.product = p;
        }
      });
      console.log(this.product);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public OpenCatalog(event: any)
  {
    this.router.navigate(["/list"]);
  }

  public Logout(event: any)
  {
    this.router.navigate(["/"]);
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
}