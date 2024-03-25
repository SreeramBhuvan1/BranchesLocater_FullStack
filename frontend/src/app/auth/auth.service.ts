import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";

export class User {
    constructor(public userId: string, public token: string, public email: string, public firstName: string, public lastName: string) { }
}
export interface LoginResponse {
    userId: string,
    token: string,
    email: string,
    firstName: string,
    lastName: string,
}
@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        return this.http.post<LoginResponse>('https://localhost:7207/api/Account/login', {
            email: email,
            password: password
        }).pipe(tap(resData => {
            const user = new User(resData.userId, resData.token, resData.email, resData.firstName, resData.lastName);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
        }));
    }

    autoLogin() {
        const userData: {
            userId: string,
            token: string,
            email: string,
            firstName: string,
            lastName: string,
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.userId, userData.token, userData.email, userData.firstName, userData.lastName);
        this.user.next(loadedUser);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }

    signup(email: string, password: string, firstname: string, lastname: string) {
        return this.http.post('https://localhost:7207/api/Account/register', {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        });
    }
    changePassword(password: string, newPassword: string) {
        const email = JSON.parse(localStorage.getItem('userData')).email;
        return this.http.post<LoginResponse>('https://localhost:7207/api/Account/changepassword', {
            email: email,
            oldPassword: password,
            newPassword: newPassword,
        }).pipe(tap(resData => {
            const user = new User(resData.userId, resData.token, resData.email, resData.firstName, resData.lastName);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
        }));
    }
}