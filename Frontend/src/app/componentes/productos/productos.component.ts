import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Notiflix from 'notiflix';
declare var $: any;
@Component({
  selector: 'app-productos',
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  constructor(private peticion: PeticionService) {}

  codigo: string = '';
  nombre: string = '';
  estado: string = 'Activo';
  idseleccionado: string = '';

  datos: any[] = [];

  ngOnInit(): void {
    this.ListarTodos();
  }

  ListarTodos() {
    var post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarTodos',
    };

    this.peticion.Get(post.host + post.path).then((respuesta: any) => {
      console.log(respuesta);
      this.datos = respuesta;
    });
  }
  SeleccionarId(id: string) {
    this.idseleccionado = id;
    var post = {
      host: this.peticion.urlHost,
      path: '/productos/ListarId',
      payload: {
        id: id,
      },
    };

    this.peticion
      .Post(post.host + post.path, post.payload)
      .then((respuesta: any) => {
        this.nombre = respuesta[0].nombre;
        this.codigo = respuesta[0].codigo;
        this.estado = respuesta[0].estado;

        $('#exampleModal').modal('show');
      });
  }

  Actualizar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/productos/actualizar',
      payload: {
        id: this.idseleccionado,
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
      path: '/productos/eliminar',
      payload: {
        id: this.idseleccionado,
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
    this.codigo = '';
    this.estado = 'Activo';
    this.idseleccionado = '';
    $('#exampleModal').modal('show');
  }

  Guardar() {
    var post = {
      host: this.peticion.urlHost,
      path: '/productos/guardar',
      payload: {
        codigo: this.codigo,
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
}
