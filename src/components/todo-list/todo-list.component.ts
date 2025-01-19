import { NgForOf, NgIf } from '@angular/common';
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
  imports: [NgForOf, ReactiveFormsModule, NgIf],
})
export class TodoListComponent {
  public filteredTodos = signal<Array<Todo>>([]);
  public filterForm = new FormGroup<FilterForm>({
    statusFilter: new FormControl<FilterType>('all', {
      nonNullable: true,
    }),
    searchFilter: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
  public editedDescription = new FormControl<string>('', {nonNullable: true});

  public isModalOpen = signal(false);
  private editingTodoId = signal<string>('');

  public currentPage = signal<number>(1);
  public totalPages = signal<number>(1);
  private pageSize = signal<number>(25);

  constructor(protected readonly todoService: TodoService) {
    merge(this.filterForm.valueChanges, toObservable(this.todoService.todos))
      .pipe(
        tap(() => this.updateFilteredTodos()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public openEditModal(todo: Todo): void {
    this.isModalOpen = signal(true);
    this.editingTodoId = signal(todo.id);
    this.editedDescription.setValue(todo.description);
  }

  public closeModal(): void {
    this.isModalOpen = signal(false);
    this.editingTodoId = signal('');
    this.editedDescription.setValue('');
  }

  public saveEdit(): void {
    if (this.editingTodoId && this.editedDescription.value) {
      this.todoService.editTodo(this.editingTodoId(), this.editedDescription.value.trim());
    }
    this.closeModal();
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.updateFilteredTodos();
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage.update(page => page + 1);
      this.updateFilteredTodos();
    }
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

    this.totalPages = signal(Math.ceil(filteredItems.length / this.pageSize()));
    this.filteredTodos = signal(this.getPageData(filteredItems));
  }

  private getPageData(filteredItems: Array<Todo>): Array<Todo> {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return filteredItems.slice(startIndex, endIndex);
  }
}
