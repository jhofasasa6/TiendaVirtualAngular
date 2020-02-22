import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";

export class User
{
  public usuario: string;
  public password: string;
}


@Injectable()
export class AuthenticationService
{
  public isLogged: Boolean = false;

  constructor (private http: Http) { }

  getUsers () : Observable<User[]>
  {
    return this.http.get("https://tiendavirtual-b6c6b.firebaseio.com/usuarios/.json").map(this.extractData);
  }

  private extractData (res: Response)
  {
      let body: User[] = res.json();
      return body;
  }

}