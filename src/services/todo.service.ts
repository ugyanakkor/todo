import { Injectable, signal } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos = signal<Array<Todo>>([]);
  private todosKey = 'todos'; // Key for localStorage

  constructor() {
    /* localstorage at that point available when initialize the todos variable,
    it has to be done in this constructor instead of line 9 */
    this.todos = signal<Array<Todo>>(this.getTodosFromLocalStorage());
  }

  public addTodo(description: string): void {
    const newTodo: Todo = {
      id: uuidv4(),
      description,
      completed: false,
    };
    this.todos.update(previousTodoArray => [...previousTodoArray, newTodo]);
    this.saveTodosToLocalStorage(this.todos());
  }

  public toggleTodoStatus(id: string): void {
    const todo = this.todos().find(todo => todo.id === id);
    if (todo) todo.completed = !todo.completed;
    this.saveTodosToLocalStorage(this.todos());
  }

  public deleteTodo(id: string): void {
    const confirmation = window.confirm('Are you sure you want to delete this todo?');
    if (confirmation) {
      const updatedTodos = this.todos().filter(todo => todo.id !== id);
      this.todos.set(updatedTodos);
    }
    this.saveTodosToLocalStorage(this.todos());
  }

  public editTodo(id: string, newDescription: string): void {
    const todo = this.todos().find(todo => todo.id === id);
    if (todo) {
      todo.description = newDescription;
      this.todos.update(todos => [...todos]); // Trigger signal update
      this.saveTodosToLocalStorage(this.todos());
    }
  }

  private saveTodosToLocalStorage(todos: Array<Todo>): void {
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
  }

  private getTodosFromLocalStorage(): Array<Todo> {
    const todosJson = localStorage.getItem(this.todosKey);
    if (todosJson) {
      return JSON.parse(todosJson);
    }
    return [];
  }
}
