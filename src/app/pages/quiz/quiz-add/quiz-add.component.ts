import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/Quiz';
import { IMessage } from 'src/app/models/IMessage';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css']
})
export class QuizAddComponent implements OnInit {

  isLoading: boolean;
  message: IMessage;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private _quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSubmit(quiz: Quiz): void {
    this.isLoading = true;
    this._quizService.addQuiz(quiz)
            .subscribe(data => {
              // console.log(data)
              if(data){
                this.message = {
                  type: "success",
                  message: "Successfully added "+data[0].title
                }
              }else{
                this.message = {
                  type: "error",
                  message: "Unable to add "+data[0].title
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
}
