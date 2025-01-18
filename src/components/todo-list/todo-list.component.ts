import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { merge, Observable, tap } from 'rxjs';

import { FilterForm, FilterFormRawValues, FilterType, Todo } from '../../interfaces/todo.interface';
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
  filterForm = new FormGroup<FilterForm>({
    statusFilter: new FormControl<FilterType>('all', {
      nonNullable: true,
    }),
    searchFilter: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  constructor(protected readonly todoService: TodoService) {
    const todosChanges$ = toObservable(this.todoService.todos);

    merge(this.filterForm.valueChanges as Observable<FilterFormRawValues>, todosChanges$)
      .pipe(
        tap(() => this.updateFilteredTodos(this.filterForm.getRawValue(), this.todoService.todos)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private updateFilteredTodos(formChanges: FilterFormRawValues, todos: Signal<Array<Todo>>): void {
    let filteredItems: Array<Todo> = [];

    this.filteredTodos = computed(() => {
      if (formChanges.statusFilter === 'completed') {
        filteredItems = todos().filter(todo => todo.completed);
      } else if (formChanges.statusFilter === 'notCompleted') {
        filteredItems = todos().filter(todo => !todo.completed);
      } else {
        filteredItems = todos();
      }

      if (formChanges.searchFilter) {
        filteredItems = filteredItems.filter(todo => {
          const { searchFilter } = formChanges;
          return todo.description.toLowerCase().includes(searchFilter.toLowerCase());
        });
      }

      return filteredItems;
    });
  }
}
