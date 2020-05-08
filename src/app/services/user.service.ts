import { Injectable } from '@angular/core';
import {User} from '../models/User';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _allUserUrl = "http://localhost:8080/quiz-rest/rest/user/users";
  private _addUserUrl = "http://localhost:8080/quiz-rest/rest/user/add";
  private _deleteUserUrl = "http://localhost:8080/quiz-rest/rest/user/delete";
  private _searchUserUrl = "http://localhost:8080/quiz-rest/rest/user/search";
  private _getUserUrl = "http://localhost:8080/quiz-rest/rest/user";

  private headers =  new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this._allUserUrl)
                    .pipe(catchError(this.errorHandler));
  }

  addUser(user: User) : Observable<User>{
    return this.http.post<User>(this._addUserUrl, JSON.stringify(user), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }
    
  deleteUser(loginName: string) : Observable<User>{
    return this.http.delete<User>(this._deleteUserUrl+"/"+loginName, { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  searchUser(title: string) : Observable<User[]>{
    return this.http.get<User[]>(this._searchUserUrl+"/"+title.toLowerCase())
                    .pipe(catchError(this.errorHandler));
  }

  getUser(loginName: string) : Observable<User>{
    return this.http.get<User>(this._getUserUrl+"/"+loginName)
                    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
