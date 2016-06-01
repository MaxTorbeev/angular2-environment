import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserService } from './users/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
    selector: 'users-app',
    template: `
        <h1>{{ title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Users']">Users</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers:  [
        UserService,
        ROUTER_PROVIDERS
    ]
})

/**
 * Декоратор конфигурации роутера
 */
@RouteConfig([
    {
        path: '/users',
        name: 'Users',
        component: UsersListComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'UserDetail',
        component: UserDetailComponent
    },
])

export class AppComponent {
    title = 'Dashboard';

}