import { Injectable } from '@angular/core';
import {Quiz} from '../models/Quiz';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  private _allQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/quizs";
  private _addQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/add";
  private _editQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/edit";
  private _deleteQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/delete";
  private _searchQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/search";
  private _getQuizUrl = "http://localhost:8080/quiz-rest/rest/quiz/q";

  private headers =  new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getQuizs() : Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this._allQuizUrl)
                    .pipe(catchError(this.errorHandler));
  }

  addQuiz(quiz: Quiz) : Observable<Quiz>{
    return this.http.post<Quiz>(this._addQuizUrl, JSON.stringify(quiz), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  editQuiz(quiz: Quiz) : Observable<Quiz>{
    return this.http.post<Quiz>(this._editQuizUrl, JSON.stringify(quiz), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }
    
  deleteQuiz(id: number) : Observable<Quiz>{
    return this.http.delete<Quiz>(this._deleteQuizUrl+"/"+id, { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  searchQuiz(title: string) : Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this._searchQuizUrl+"/"+title.toLowerCase())
                    .pipe(catchError(this.errorHandler));
  }

  getQuiz(id: number) : Observable<Quiz>{
    return this.http.get<Quiz>(this._getQuizUrl+"/"+id)
                    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  makeRandomString (length: number, possible: string): string{
    let text = "";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
