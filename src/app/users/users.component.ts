import { User } from '../_models/user';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((response: User[]) => {
      this.users = response;
    });
  }

  deleteUser(user: User) {
    this.users = this.users.filter(value => {
      return value._id !== user._id;
    });
    const userId = {
      userId: user._id
    };
    this.userService.deleteUser(userId).subscribe();
  }

}
