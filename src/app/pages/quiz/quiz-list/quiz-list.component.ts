import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/Quiz';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from '../../../models/IMessage';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizs: Quiz[];

  message: IMessage;

  isLoading: boolean;

  constructor(
    private _quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.getQuizs();
  }

  getQuizs(): void{
    this.isLoading = true;
    this._quizService.getQuizs()
                  .subscribe(data => {
                    console.log(data)
                    this.quizs = data;
                    this.isLoading = false;
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                    this.isLoading = false;
                  });
  }

  handleDelete(item: any): void{
    this.isLoading = true;
    this._quizService.deleteQuiz(item.id)
                  .subscribe(data => {
                    this.isLoading = false;
                    if(data[0] == "success"){
                      this.message = {
                        type: "success",
                        message: "Successfully deleted "+item.name
                      }
                      this.getQuizs();
                    }else{
                      this.message = {
                        type: "error",
                        message: "Unable to delete "+item.name
                      }
                    }
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                    this.isLoading = false;
                  });
  }

  handleSearch(text: string): void{
    this.isLoading = true;
    this._quizService.searchQuiz(text)
                  .subscribe(data => {
                    this.quizs = data;
                    if(this.quizs.length > 0){
                      this.message = {
                        type: "success",
                        message: "Quiz found on title contains '"+text+"'."
                      }
                    }else{
                      this.message = {
                        type: "warning",
                        message: "No Quiz found on title contains '"+text+"'."
                      }
                    }
                    this.isLoading = false;
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                    this.isLoading = false;
                  });
  }

  displayMessage(message: IMessage): void {
    this.message = message;
  }

}
