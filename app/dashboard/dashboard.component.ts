import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { User } from './../users/user';
import { UserService } from './../users/user.service';

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    users: User[] = [];

    constructor(
        private _router: Router,
        private _userService: UserService) {
    }

    ngOnInit() {
        this._userService.getUsers()
            .then(users => this.users = users.slice(1,5));
    }

    gotoDetail(user: User){
        let link = ['UserDetail', { id: user.id }];
        this._router.navigate(link);
    }
}