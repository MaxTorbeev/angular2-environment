import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { User } from './../user';
import { UserService } from './../user.service';

@Component({
    selector: 'user-detail',
    templateUrl: './app/users/user-detail/user-detail.component.html',
    styleUrls: ['./app/users/user-detail/user-detail.component.css']
})


export class UserDetailComponent implements OnInit {
    user: User;

    constructor(
        private _userService: UserService,
        private _routeParams: RouteParams) {
    }

    /**
     * Метод инициализации контроллера
     */
    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._userService.getUser(id)
            .then(user => this.user = user);
    }

    /**
     * Метод возвращение на предидущий URL
     */
    goBack() {
        window.history.back();
    }


}