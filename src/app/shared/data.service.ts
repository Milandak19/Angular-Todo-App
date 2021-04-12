import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  todos: Todo[] = [
    new Todo('Hello thanks for coming to see my personal portfolio project ♥.', true),
    new Todo('You can add a new todo, delete todo, or edit your todo. You can click on the todo to completed or uncompleted your todo.', false)
  ];

  constructor() { }

  getAllTodos() {
    return this.todos
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1)
  }
}
