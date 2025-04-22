import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  constructor(private peticion: PeticionService) {}

  email: string = '';
  nombre: string = '';
  password: string = '';
  estado: string = 'Activo';
  datos: any[] = [];

  ngOnInit(): void {
    this.ListarTodos();
  }

  ListarTodos() {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((respuesta: any) => {
      console.log(respuesta);
      this.datos = respuesta;
    });
  }
  SeleccionarEmail(email: string) {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/ListarUnico',
      payload: {
        email: email,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.nombre = respuesta[0].nombre;
        this.email = respuesta[0].email;
        this.estado = respuesta[0].estado;

        $('#exampleModal').modal('show');
      });
  }

  Actualizar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/actualizar',
      payload: {
        email: this.email,
        nombre: this.nombre,
        estado: this.estado,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state == true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.ListarTodos();
          $('#exampleModal').modal('hide');
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      });
  }

  Eliminar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/eliminar',
      payload: {
        email: this.email,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state == true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.ListarTodos();
          $('#exampleModal').modal('hide');
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      });
  }

  Nuevo() {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.estado = '';
    $('#exampleModal').modal('show');
  }

  Guardar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/usuarios/registrar',
      payload: {
        email: this.email,
        nombre: this.nombre,
        password: this.password,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        if (respuesta.state == true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.ListarTodos();
          $('#exampleModal').modal('hide');
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      });
  }
}
