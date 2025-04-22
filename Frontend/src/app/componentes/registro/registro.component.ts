import { Component, Host } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  constructor(private peticion: PeticionService) {}

  nombre: string = '';
  email: string = '';
  password: string = '';
  respuestatest: any = {};

  Registrar() {
    if (this.nombre == '') {
      Notiflix.Notify.failure('EL CAMPO NOMBRE ES OBLIGATORIO');
      return false;
    }

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
      path: '/usuarios/registrar',
      payload: {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        console.log(respuesta);
        this.respuestatest = respuesta;
        if (respuesta.state == false) {
          Notiflix.Notify.failure(respuesta.mensaje);
        } else {
          Notiflix.Notify.success(respuesta.mensaje);
        }
      });

    return true;
  }
}
