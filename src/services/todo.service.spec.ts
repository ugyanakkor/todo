import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { Todo } from '../interfaces/todo.interface';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  const todo: Todo = {
    id: '1',
    description: 'write tests',
    completed: false
  }

  beforeEach(() => {
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeInstanceOf(TodoService);
  });

  it('should add todo', () => {
    const description = "new todo"
    expect(service.todos()).toEqual([]);

    service.addTodo(description)
    expect(service.todos().length).toEqual(1);
    expect(service.todos()[0].description).toEqual(description);
    expect(service.todos()[0].completed).toEqual(false);
  });


  it('should modify todo', () => {
    service.todos = signal([todo]);
    expect(service.todos()).toEqual([todo]);

    expect(service.todos()[0].completed).toEqual(false);
    service.toggleTodoStatus(todo.id)
    expect(service.todos()[0].completed).toEqual(true);
  });

  it('should delete todo', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    expect(confirmSpy).not.toHaveBeenCalled();

    service.todos = signal([todo]);

    expect(service.todos().length).toEqual(1);
    service.deleteTodo(todo.id)
    expect(service.todos().length).toEqual(0);
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should edit todo description', () => {
    service.todos = signal([todo]);
    expect(service.todos()[0].description).toEqual(todo.description);

    const modifiedDescription = "tests are done";
    service.editTodo(todo.id, modifiedDescription)
    expect(service.todos()[0].description).toEqual(modifiedDescription);
  });
});
