import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { IMessage } from 'src/app/models/IMessage';
import { Quiz } from '../../../models/Quiz';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {

  isLoading: boolean;
  message: IMessage; 
  quiz: Quiz;

  constructor(
    private _quizService: QuizService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getQuiz(+id);
  }

  getQuiz(id: number): void {
    this._quizService.getQuiz(id)
                  .subscribe(data => {
                    this.quiz = data;
                    // console.log(this.quiz)
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                  });
  }

  onSubmit(quiz: Quiz): void {
      this.isLoading = true;
      this._quizService.editQuiz(quiz)
              .subscribe(data => {
                // console.log(data)
                if(data){
                  this.message = {
                    type: "success",
                    message: "Successfully updated "+data[0].title
                  }
                }else{
                  this.message = {
                    type: "error",
                    message: "Unable to update "+data[0].title
                  }
                }
                this.isLoading = false;
                this.getQuiz(this.quiz.id);
              },
              error => {
                this.message = {
                  type: "error",
                  message: error
                }
            });
  }

}
