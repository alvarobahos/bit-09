import { TestBed } from '@angular/core/testing';

import { PeticionService } from './peticion.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('PeticionService', () => {
  let service: PeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PeticionService, provideRouter(routes)],
    });
    service = TestBed.inject(PeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('valida la peticion tipo POST', (done) => {
    const mokupUrl = service.urlHostTest + '/usuarios/registrar';
    const mokuppayload = {};
    const mokuprespuesta = {
      state: false,
      mensaje: 'el campo nombre es obligatorio',
    };
    service.Post(mokupUrl, mokuppayload).then((res: any) => {
      expect(res).toEqual(mokuprespuesta);
      done();
    });
  });

  it('valida que la peticion tipo GET', (done) => {
    const mokupUrl = service.urlHostTest + '/usuarios/listartodos';
    const mokuppayload = {};
    const mokuprespuesta = {
      _id: '67f64bfde35ecdef14ea7c9a',
      nombre: 'alva',
      email: 'pecar@provko.com',
      estado: 'Inactivo',
    };
    service.Get(mokupUrl).then((res: any) => {
      console.log('----------------->');
      console.log(res.length);
      expect(res[0]).toEqual(mokuprespuesta);
      done();
    });
  });
});
