import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosComponent } from './servicios.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;

  beforeEach(async () => {
    (window as any).$ = jasmine.createSpy().and.returnValues({
      modal: jasmine.createSpy(),
    });
    await TestBed.configureTestingModule({
      imports: [ServiciosComponent, HttpClientModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Los campos Existentes deberian quedar limpios', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;

    component.nombre = 'sdafdsg';
    component.Nuevo();
    expect(component.codigo).toBe('');
    expect(component.nombre).toBe('');
    done();
  });

  it('La funcionalidad guardar deberia fallar sino mando el codigo', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.codigo = '';
    component.nombre = '';
    component.Guardar();
    setTimeout(() => {
      expect(component.respuestatesGuardar).toEqual({
        state: false,
        mensaje: 'el campo codigo es obligatorio',
      });
      done();
    }, 40);
  });

  it('La funcionalidad guardar deberia fallar sino mando el nombre', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.codigo = '45';
    component.nombre = '';
    component.Guardar();
    setTimeout(() => {
      expect(component.respuestatesGuardar).toEqual({
        state: false,
        mensaje: 'el campo nombre es obligatorio',
      });
      done();
    }, 40);
  });

  it('Deberia Guardar o Actualizar el Servicio', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;

    var random = Math.floor(Math.random() * (1999 - 0) + 0);
    component.codigo = 'w' + random;
    component.nombre = 'servicio w';
    component.Guardar();
    setTimeout(() => {
      expect(component.respuestatesGuardar).toEqual({
        state: true,
        mensaje: 'Elemento Guardado Correctamente',
      });
      done();
    }, 40);
  });

  it('Deberia Reportar que el Servicio con ese codigo ya existe', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;

    component.codigo = 'x2';
    component.nombre = 'servicio w';
    component.Guardar();
    setTimeout(() => {
      expect(component.respuestatesGuardar).toEqual({
        state: false,
        mensaje: 'El codigo del Elemento ya Existe, intente con otro ',
      });
      done();
    }, 40);
  });

  it('Deberia Listar los elementos', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;

    component.ListarTodos();
    setTimeout(() => {
      expect(component.respuestates.length).toBeGreaterThan(0);
      done();
    }, 40);
  });

  it('En SeleccionarId debe exigir el Id', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;

    component.SeleccionarId('');
    setTimeout(() => {
      expect(component.respuestates).toEqual({
        state: false,
        mensaje: 'el campo id es obligatorio',
      });
      done();
    }, 40);
  });

  it('En SeleccionarId debe traer los datos del Id', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    let mokuprespuesta = [
      {
        _id: '68049427fa159814779f02a4',
        nombre: 'prueba',
        codigo: 'x655',
      },
    ];
    component.SeleccionarId('68049427fa159814779f02a4');
    setTimeout(() => {
      expect(component.respuestates).toEqual(mokuprespuesta);
      done();
    }, 40);
  });

  it('En Actualizar debe exigir el Id', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.idseleccionado = '';
    component.nombre = '';
    let mokuprespuesta = {
      state: false,
      mensaje: 'el campo id es obligatorio',
    };
    component.Actualizar();
    setTimeout(() => {
      expect(component.respuestatesActualizar).toEqual(mokuprespuesta);
      done();
    }, 40);
  });

  it('En Actualizar debe exigir el nombre', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.idseleccionado = '68049427fa159814779f02a4';
    component.nombre = '';
    let mokuprespuesta = {
      state: false,
      mensaje: 'el campo nombre es obligatorio',
    };
    component.Actualizar();
    setTimeout(() => {
      expect(component.respuestatesActualizar).toEqual(mokuprespuesta);
      done();
    }, 40);
  });

  it('En Actualizar debe exigir el codigo', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.idseleccionado = '68049427fa159814779f02a4';
    component.nombre = 'prueba';
    let mokuprespuesta = {
      state: false,
      mensaje: 'el campo codigo es obligatorio',
    };
    component.Actualizar();
    setTimeout(() => {
      expect(component.respuestatesActualizar).toEqual(mokuprespuesta);
      done();
    }, 40);
  });

  it('En actualizar deberia tomar lo cambios', (done) => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    component.idseleccionado = '68049427fa159814779f02a4';
    component.codigo = 'x655';
    component.nombre = 'prueba';
    let mokuprespuesta = {
      state: true,
      mensaje: 'Elemento actualizado correctamente',
    };
    component.Actualizar();
    setTimeout(() => {
      expect(component.respuestatesActualizar).toEqual(mokuprespuesta);
      done();
    }, 40);
  });
});
