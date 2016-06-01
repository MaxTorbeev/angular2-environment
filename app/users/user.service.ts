import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './in-memory-data.service'

@Injectable() //Рекомендуему добавлять всегда в сервис
export class UserService {

    /** URL to web api */
    private usersUrl = 'app/users';

    constructor(private http: Http) { }

    /** Забираем коллекцию пользователей */
    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this._handleError);
    }

    /** Забираем одного пользователя */
    getUser(id: number) {
        return this.getUsers()
            .then(users => users.filter(user => user.id === id)[0]
        );
    }

    /** Добавляем нового пользователя */
    private post(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.usersUrl, JSON.stringify(user), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this._handleError);
    }

    /** Обновляем существующего пользователя */
    private put(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user.id}`;

        return this.http
            .put(url, JSON.stringify(user), {headers: headers})
            .toPromise()
            .then(() => user)
            .catch(this._handleError);
    }

    save(user: User): Promise<User>  {
        if (user.id) {
            return this.put(user);
        }
        return this.post(user);
    }

    delete(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this._handleError);
    }

    private _handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}