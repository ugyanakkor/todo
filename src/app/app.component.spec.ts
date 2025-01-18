import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { beforeEach, describe, expect, it } from 'vitest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } }
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeInstanceOf(AppComponent);
  });
});
