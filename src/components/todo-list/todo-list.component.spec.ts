import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expect } from '@playwright/test';
import {vi} from 'vitest';

import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let todoService: TodoService;

  const todo: Todo = {
    id: '1',
    description: 'check the unit tests',
    completed: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
      imports: [TodoListComponent],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService); // Or use: fixture.debugElement.injector.get(TodoService);
  });

  it('should create todo list component', () => {
    expect(component).toBeInstanceOf(TodoListComponent);
  });

  it('should set the component values when open or close the edit modal with a Todo item', () => {
    component.openEditModal(todo);
    expect(component.isModalOpen()).toEqual(true);
    expect(component.editedDescription.value).toEqual(todo.description);

    component.closeModal();
    expect(component.isModalOpen()).toEqual(false);
    expect(component.editedDescription.value).toEqual('');
  });

  it('should change todo description when save the edit modal', () => {
    const originalDescription = "check the test"
    todoService.addTodo(originalDescription);
    const todo = todoService.todos();

    component.openEditModal(todo[0]);
    expect(component.editedDescription.value).toEqual(originalDescription);

    const modifiedDescription = "checked the test"
    component.editedDescription.setValue(modifiedDescription)

    const closeModalSpy = vi.spyOn(component, 'closeModal');
    component.saveEdit();
    expect(closeModalSpy).toHaveBeenCalled();
    expect(todoService.todos()[0].description).toEqual(modifiedDescription);
  });
});
