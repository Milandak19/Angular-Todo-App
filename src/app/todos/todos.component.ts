import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[]
  showValidationErrors: boolean

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  addTodo(form: NgForm) {
    if(!form.valid) return this.showValidationErrors = true
    
    this.dataService.addTodo(new Todo(form.value.text))
    this.showValidationErrors = false
    form.reset()
  }

  setCompleted(todo: Todo) {
    todo.completed = !todo.completed
  }

  editTodo(todo: Todo) {
    // this.dataService.updateTodo()
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '600px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dataService.updateTodo(index, result)
      }
    })
  }
}
