import { element } from 'protractor';
import { Todo } from './../_models/todo';
import { TokenService } from './../_services/token.service';
import { TodoService } from './../_services/todo.service';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todosForm: FormGroup;
  userId: string;
  todos: Array<Todo> = [];
  view = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private tokenService: TokenService,
    private eRef: ElementRef
  ) { }

  ngOnInit() {
    this.todosForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
    const userData = this.tokenService.getPayload();
    this.userId = userData.data._id;
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos(this.userId).subscribe((response: Todo[]) => {
      this.todos = response;
    });
  }

  submit() {
    const todoData = {
      text: this.todosForm.value.text,
      user: this.userId
    };
    this.todoService.saveTodo(todoData).subscribe(response => {
    });
    this.todos.push(this.todosForm.value);
  }
}
