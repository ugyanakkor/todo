import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let fixture: ComponentFixture<AddTodoComponent>;
  let component: AddTodoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddTodoComponent],
    });

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
  });

  it('should create add todo component', () => {
    expect(component).toBeInstanceOf(AddTodoComponent);
  });
});
