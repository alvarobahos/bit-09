import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida que el nombre sea obligatorio en el front y saque un mensaje', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = '';
    component.Registrar();
    setTimeout(() => {
      expect(document.getElementsByClassName('nx-message')[0].textContent).toBe(
        'EL CAMPO NOMBRE ES OBLIGATORIO'
      );
      done();
    }, 40);
  });

  it('valida que el email sea obligatorio en el front y saque un mensaje', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = 'jhon';
    component.email = '';
    component.Registrar();
    setTimeout(() => {
      expect(document.getElementsByClassName('nx-message')[1].textContent).toBe(
        'EL CAMPO EMAIL ES OBLIGATORIO'
      );
      done();
    }, 40);
  });

  it('valida que el Password sea obligatorio en el front y saque un mensaje', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = 'jhon';
    component.email = 'juan@gmail.com';
    component.password = '';
    component.Registrar();
    setTimeout(() => {
      expect(document.getElementsByClassName('nx-message')[2].textContent).toBe(
        'EL CAMPO PASSWORD ES OBLIGATORIO'
      );
      done();
    }, 40);
  });

  it('Debe Registrar el usuario', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    var random = Math.random() * (9999 - 0) + 0;
    component.nombre = 'alva';
    component.email = 'pecar' + random + '@provko.com';
    component.password = '1234';
    const mokuprespuesta = {
      state: true,
      mensaje: 'Usuario Guardado Correctamente',
    };
    component.Registrar();
    setTimeout(() => {
      expect(component.respuestatest).toEqual(mokuprespuesta);
      done();
    }, 40);
  });

  it('Al resgistrar debe reportar que el usuario ya existe', (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = 'alva';
    component.email = 'pecar@provko.com';
    component.password = '1234';
    const mokuprespuesta = {
      state: false,
      mensaje: 'El Email ya existe en la Base de Datos, intente con otro ',
    };
    component.Registrar();
    setTimeout(() => {
      expect(component.respuestatest).toEqual(mokuprespuesta);
      done();
    }, 40);
  });
});
