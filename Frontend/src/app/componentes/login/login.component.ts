import { Component } from '@angular/core';
import Notiflix from 'notiflix';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private peticion: PeticionService, private router: Router) {}

  email: string = '';
  password: string = '';

  login() {
    if (this.email == '') {
      Notiflix.Notify.failure('EL CAMPO EMAIL ES OBLIGATORIO');
      return false;
    }

    if (this.password == '') {
      Notiflix.Notify.failure('EL CAMPO PASSWORD ES OBLIGATORIO');
      return false;
    }

    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/login',
      payload: {
        email: this.email,
        password: this.password,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        console.log(respuesta);
        if (respuesta.state == false) {
          Notiflix.Notify.failure(respuesta.mensaje);
        } else {
          Notiflix.Notify.success(respuesta.mensaje);
          this.router.navigate(['dashboard']);
        }
      });

    return true;
  }
}
