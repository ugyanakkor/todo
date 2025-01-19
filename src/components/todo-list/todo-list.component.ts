import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { merge, tap } from 'rxjs';

import { FilterForm, FilterType, Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, ReactiveFormsModule],
})
export class TodoListComponent {
  filteredTodos = signal<Array<Todo>>([]);
  filterForm = new FormGroup<FilterForm>({
    statusFilter: new FormControl<FilterType>('all', {
      nonNullable: true,
    }),
    searchFilter: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  constructor(protected readonly todoService: TodoService) {
    merge(this.filterForm.valueChanges, toObservable(this.todoService.todos))
      .pipe(
        tap(() => this.updateFilteredTodos()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private updateFilteredTodos(): void {
    const { statusFilter, searchFilter} = this.filterForm.getRawValue();
    let filteredItems = this.todoService.todos();

    if (statusFilter === 'completed') {
      filteredItems = filteredItems.filter(todo => todo.completed);
    } else if (statusFilter === 'notCompleted') {
      filteredItems = filteredItems.filter(todo => !todo.completed);
    }

    if (searchFilter) {
      filteredItems = filteredItems.filter(todo =>
         todo.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    this.filteredTodos = signal(filteredItems);
  }
}
