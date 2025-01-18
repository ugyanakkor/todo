import { Injectable, signal } from '@angular/core';

import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos = signal<Array<Todo>>([]);
  private nextId = 1;

  public addTodo(description: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      description,
      completed: false,
    };
    this.todos.update(previousTodoArray => [...previousTodoArray, newTodo]);
  }

  public toggleTodoStatus(id: number): void {
    const todo = this.todos().find(todo => todo.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  public deleteTodo(id: number): void {
    const updatedTodos = this.todos().filter(todo => todo.id !== id);
    this.todos.set(updatedTodos);
  }
}
