import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal,signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { merge, Observable, tap } from 'rxjs';

import { FilterType, Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgForOf, ReactiveFormsModule],
})
export class TodoListComponent {
  filteredTodos: Signal<Array<Todo>> = signal([]);
  filterControl = new FormControl<FilterType>('all', {
    nonNullable: true,
  });

  constructor(protected readonly todoService: TodoService) {
    const filterChanges$ = this.filterControl.valueChanges as Observable<FilterType>;
    const todosChanges$ = toObservable(this.todoService.todos);

    merge(filterChanges$, todosChanges$)
      .pipe(
        tap(() => this.updateFilteredTodos(this.filterControl.value, this.todoService.todos)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private updateFilteredTodos(filter: FilterType, todos: Signal<Array<Todo>>): void {
    this.filteredTodos = computed(() => {
      switch (filter) {
        case 'completed':
          return todos().filter(todo => todo.completed);
        case 'notCompleted':
          return todos().filter(todo => !todo.completed);
        case 'all':
        default:
          return todos();
      }
    });
  }
}
