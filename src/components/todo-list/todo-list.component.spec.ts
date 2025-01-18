import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListComponent],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create todo list', () => {
    expect(component).toBeInstanceOf(TodoListComponent);
  });
});
