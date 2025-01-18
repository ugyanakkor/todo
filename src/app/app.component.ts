import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AddTodoComponent, TodoListComponent],
})
export class AppComponent {}
