import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";

export class Product
{
  public id: number;
  public imagen: string;
  public nombre: string;
  public unidades: number;
  public valor: number;
}


@Injectable()
export class ProductService
{
  constructor (private http: Http) { }

  getProducts () : Observable<Product[]>
  {
    return this.http.get("https://tiendavirtual-b6c6b.firebaseio.com/Productos/.json").map(this.extractData);
  }

  private extractData (res: Response)
  {
      let body: Product[] = res.json();
      return body;
  }

}