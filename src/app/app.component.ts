import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AddTodoComponent } from '../components/add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddTodoComponent,
  ],
})
export class AppComponent {}
