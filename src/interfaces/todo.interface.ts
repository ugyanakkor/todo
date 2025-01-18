import { FormControl } from '@angular/forms';

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'notCompleted';

export interface FilterForm {
  statusFilter: FormControl<string>;
  searchFilter: FormControl<string>;
}

export interface FilterFormRawValues {
  statusFilter: string;
  searchFilter: string;
}
