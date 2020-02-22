import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, User } from './shared/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthenticationService
  ) { }

  ngOnInit()
  {
    this.LoginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
        password: ['', Validators.required]
      }
    );
  }

  public validateUser() : void
  {
    if (!this.LoginForm.valid)
    {
      if (this.LoginForm.controls['username'].invalid)
      {
        if (this.LoginForm.controls['username'].hasError('required'))
        {
          alert("El username campo es requerido");
        }
        else if (this.LoginForm.controls['username'].hasError("pattern"))
        {
          alert("El formato de correo es inválido");
        }
      }

      if (this.LoginForm.controls['password'].invalid)
      {
        if (this.LoginForm.controls['password'].hasError('required'))
        {
          alert("El password es requerida.");
        }
      }
    }
    else
    {
      let response: Observable<User[]> = this.service.getUsers();

      response.subscribe((users: User[]) =>
      {
        let isLogged: Boolean = false;
        users.forEach((user: User) =>
        {
          if (user.usuario == this.LoginForm.controls['username'].value && user.password == this.LoginForm.controls['password'].value && !isLogged)
          {
            isLogged = true;
          }
        });

        if (isLogged)
        {
          localStorage.removeItem('shoppingCart');
          localStorage.setItem("shoppingCart", JSON.stringify([]));
          this.router.navigate(['/list']);
        }
        else
        {
          alert("Ha ocurrido un error en los datos y no puede iniciar sesión");
        }
      });
    }
  }
}
