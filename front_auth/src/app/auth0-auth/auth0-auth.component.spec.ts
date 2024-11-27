import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth0AuthComponent } from './auth0-auth.component';

describe('Auth0AuthComponent', () => {
  let component: Auth0AuthComponent;
  let fixture: ComponentFixture<Auth0AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth0AuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth0AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
