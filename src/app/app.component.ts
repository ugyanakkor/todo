import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AddTodoComponent, TodoListComponent, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {}
