import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private _allQuestionUrl = "http://localhost:8080/quiz-rest/rest/question/questions";
  private _addQuestionUrl = "http://localhost:8080/quiz-rest/rest/question/add";
  private _editQuestionUrl = "http://localhost:8080/quiz-rest/rest/question/edit";
  private _deleteQuestionUrl = "http://localhost:8080/quiz-rest/rest/question/delete";
  private _searchQuestionUrl = "http://localhost:8080/quiz-rest/rest/question/search";
  private _getQuestionUrl = "http://localhost:8080/quiz-rest/rest/question";

  private headers =  new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getQuestions() : Observable<Question[]>{
    return this.http.get<Question[]>(this._allQuestionUrl)
                    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  addQuestion(question: Question) : Observable<Question>{
    return this.http.post<Question>(this._addQuestionUrl, JSON.stringify(question), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  editQuestion(question: Question) : Observable<Question>{
    return this.http.post<Question>(this._editQuestionUrl, JSON.stringify(question), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  deleteQuestion(id: number) : Observable<Question>{
    return this.http.delete<Question>(this._deleteQuestionUrl+"/"+id, { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  getQuestion(id: number) : Observable<Question>{
    return this.http.get<Question>(this._getQuestionUrl+"/"+id, { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  searchQuestion(title: string) : Observable<Question[]>{
    return this.http.get<Question[]>(this._searchQuestionUrl+"/"+title.toLowerCase())
                    .pipe(catchError(this.errorHandler));
  }
}
