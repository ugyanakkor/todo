import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  {
    path: 'todos',
    loadComponent: () => import('./components/todo-list/todo-list.component').then(m => m.TodoListComponent),
  },
  {
    path: 'add-todo',
    loadComponent: () => import('./components/add-todo/add-todo.component').then(m => m.AddTodoComponent),
  },
  { path: '**', redirectTo: '/todos' },
];
