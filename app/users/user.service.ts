import {Injectable} from '@angular/core';

import {USERS} from './mock-users'

@Injectable() //Рекомендуему добавлять всегда в сервис

export class UserService {

    getUser(id: number) {
        return Promise.resolve(USERS).then(
                users => users.filter(user => user.id === id)[0]
        );
    }

    getUsers() {
        return Promise.resolve(USERS);
    }
}