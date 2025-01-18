import { Injectable, signal } from '@angular/core';

import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<Array<Todo>>([]);
  private nextId = 1;

  public getTodos(): Array<Todo> {
    return this.todos();
  }

  public addTodo(description: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      description,
      completed: false,
    };
    this.todos.update(previousTodoArray => [...previousTodoArray, newTodo]);
  }
}
