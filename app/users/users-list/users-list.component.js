"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var user_detail_component_1 = require('./../user-detail/user-detail.component');
var user_service_1 = require('./../user.service');
var UsersListComponent = (function () {
    /** Конструктор подключения userService */
    function UsersListComponent(_router, _userService) {
        this._router = _router;
        this._userService = _userService;
        this.addingUser = false;
    }
    UsersListComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    /** Метод вызова массива пользователей c помощью Promise */
    UsersListComponent.prototype.getUsers = function () {
        var _this = this;
        this._userService
            .getUsers()
            .then(function (users) { return _this.users = users; })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    UsersListComponent.prototype.delete = function (user, event) {
        var _this = this;
        event.stopPropagation();
        this._userService
            .delete(user)
            .then(function (res) {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    UsersListComponent.prototype.addUser = function () {
        this.addingUser = true;
        this.selectedUser = null;
    };
    UsersListComponent.prototype.close = function (savedUser) {
        this.addingUser = false;
        if (savedUser) {
            this.getUsers();
        }
    };
    /**
     * Метод загруки массива userService
     * @link: https://angular.io/docs/ts/latest/api/core/OnInit-interface.html
     */
    UsersListComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersListComponent.prototype.gotoDetail = function () {
        this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
    };
    UsersListComponent = __decorate([
        core_1.Component({
            selector: 'users-list',
            templateUrl: 'app/users/users-list/users-list.component.html',
            styleUrls: ['app/users/users-list/users-list.component.css'],
            directives: [user_detail_component_1.UserDetailComponent],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, user_service_1.UserService])
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;
