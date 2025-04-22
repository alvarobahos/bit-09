import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulateralComponent } from './menulateral.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('MenulateralComponent', () => {
  let component: MenulateralComponent;
  let fixture: ComponentFixture<MenulateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenulateralComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(MenulateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
