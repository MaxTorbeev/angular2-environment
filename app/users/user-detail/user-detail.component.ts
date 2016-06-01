import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Input() user: User;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private _userService: UserService,
        private _routeParams: RouteParams) {
    }

    /**
     * Метод инициализации контроллера
     */
    ngOnInit() {
        if (this._routeParams.get('id') !== null) {
            let id = +this._routeParams.get('id');
            this.navigated = true;
            this._userService.getUser(id)
                .then(user => this.user = user);
        } else {
            this.navigated = false;
            this.user = new User();
        }
    }

    save() {
        this._userService
            .save(this.user)
            .then(hero => {
                this.user = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    /**
     * Метод возвращение на предидущий URL
     */
    goBack(savedUser: User = null) {
        this.close.emit(savedUser);
        if (this.navigated) { window.history.back(); }
    }


}