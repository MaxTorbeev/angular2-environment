import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { User } from '../user';
import { UserDetailComponent } from './../user-detail/user-detail.component';
import { UserService } from './../user.service'

@Component({
    selector: 'users-list',
    templateUrl: 'app/users/users-list/users-list.component.html',
    styleUrls: ['app/users/users-list/users-list.component.css'],
    directives: [UserDetailComponent],
    //providers: [UserService]
})

export class UsersListComponent implements OnInit{
    users: User[];
    selectedUser: User;

    /** Конструктор подключения userService */
    constructor(
        private _router: Router,
        private _userService: UserService) { }

    onSelect(user: User) {
        this.selectedUser = user;
    }

    getUsers() {
        this._userService.getUsers().then(users => this.users = users);
    }

    /**
     * Метод загруки массива userService
     * @link: https://angular.io/docs/ts/latest/api/core/OnInit-interface.html
     */
    ngOnInit() {
        this.getUsers();
    }

    /** Метод вызова массива пользователей c помощью Promise */
    getUsers() {
        this._userService.getUsers().then(users => this.users = users);
    }

    gotoDetail() {
        this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
    }
}
