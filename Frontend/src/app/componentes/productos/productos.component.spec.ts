import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponent } from './productos.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent, HttpClientModule],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
