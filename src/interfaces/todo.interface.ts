export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'notCompleted';
