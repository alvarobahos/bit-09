import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-servicios',
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  constructor(private peticion: PeticionService) {}

  codigo: string = '';
  nombre: string = '';
  idseleccionado: string = '';
  respuestates: any = {};
  respuestatesGuardar: any = {};
  respuestatesActualizar: any = {};

  datos: any[] = [];

  ngOnInit(): void {
    this.ListarTodos();
  }
  Nuevo() {
    this.nombre = '';
    this.codigo = '';

    $('#exampleModal').modal('show');
  }
  Guardar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/servicios/guardar',
      payload: {
        codigo: this.codigo,
        nombre: this.nombre,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.respuestatesGuardar = respuesta;
        if (respuesta.state == true) {
          Notiflix.Notify.success(respuesta.mensaje);
          this.ListarTodos();
          $('#exampleModal').modal('hide');
        } else {
          Notiflix.Notify.failure(respuesta.mensaje);
        }
      });
  }
  ListarTodos() {
    var post = {
      host: this.peticion.urlHost,
      path: '/servicios/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((respuesta: any) => {
      console.log(respuesta);
      this.respuestates = respuesta;
      this.datos = respuesta;
    });
  }
  SeleccionarId(id: string) {
    this.idseleccionado = id;
    var post = {
      host: this.peticion.urlHost,
      path: '/servicios/ListarId',
      payload: {
        id: id,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.respuestates = respuesta;
        if (respuesta.length > 0) {
          this.nombre = respuesta[0].nombre;
          this.codigo = respuesta[0].codigo;
          $('#exampleModal').modal('show');
        }
      });
  }

  Actualizar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/servicios/actualizar',
      payload: {
        id: this.idseleccionado,
        codigo: this.codigo,
        nombre: this.nombre,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.respuestatesActualizar = respuesta;
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
      path: '/servicios/eliminar',
      payload: {
        id: this.idseleccionado,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.respuestates = respuesta;
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
