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
    addingUser = false;
    error: any;

    /** Конструктор подключения userService */
    constructor(
        private _router: Router,
        private _userService: UserService) { }

    onSelect(user: User) {
        this.selectedUser = user;
    }

    /** Метод вызова массива пользователей c помощью Promise */
    getUsers() {
        this._userService
            .getUsers()
            .then(users => this.users = users)
            .catch(error => this.error = error); // TODO: Display error message
    }

    delete(user: User, event: any) {
        event.stopPropagation();
        this._userService
            .delete(user)
            .then(res => {
                this.users = this.users.filter(h => h !== user);
                if (this.selectedUser === user) { this.selectedUser = null; }
            })
            .catch(error => this.error = error); // TODO: Display error message
    }


    addUser() {
        this.addingUser = true;
        this.selectedUser = null;
    }

    close(savedUser: User) {
        this.addingUser = false;
        if (savedUser) { this.getUsers(); }
    }

    /**
     * Метод загруки массива userService
     * @link: https://angular.io/docs/ts/latest/api/core/OnInit-interface.html
     */
    ngOnInit() {
        this.getUsers();
    }

    gotoDetail() {
        this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
    }
}
