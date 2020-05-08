import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Answer } from '../models/Answer';
import { MCQAnswer } from '../models/MCQAnswer';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private _addAnswerUrl = "http://localhost:8080/quiz-rest/rest/exam/answer";
  private _addMcqAnswerUrl = "http://localhost:8080/quiz-rest/rest/exam/mcqanswer";
  private _getUserAnswer =  "http://localhost:8080/quiz-rest/rest/exam/user";
  private _getUserMCQAnswer =  "http://localhost:8080/quiz-rest/rest/exam/user";

  private headers =  new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  addAnswer(answer: Answer) : Observable<Answer>{
    return this.http.post<Answer>(this._addAnswerUrl, JSON.stringify(answer), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  addMcqAnswer(answer: MCQAnswer) : Observable<MCQAnswer>{
    return this.http.post<MCQAnswer>(this._addMcqAnswerUrl, JSON.stringify(answer), { headers: this.headers })
                    .pipe(catchError(this.errorHandler));
  }

  getUserAnswer(id: string): Observable<Answer[]>{
    return this.http.get<Answer[]>(this._getUserAnswer+'/'+id+'/answer')
    .pipe(catchError(this.errorHandler));
  }

  getUserMCQAnswer(id: string): Observable<MCQAnswer[]>{
    return this.http.get<MCQAnswer[]>(this._getUserMCQAnswer+'/'+id+'/mcqanswer')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
