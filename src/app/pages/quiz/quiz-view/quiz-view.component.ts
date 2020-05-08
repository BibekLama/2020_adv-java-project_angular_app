import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/Quiz';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { IMessage } from 'src/app/models/IMessage';


@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {

  quiz: Quiz;

  error: string;

  isLoading: boolean;

  message: IMessage;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _quizService: QuizService
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getQuiz(+id);
  }

  getQuiz(id: number): void {
    this._quizService.getQuiz(id)
                  .subscribe(data => {
                    
                    this.quiz = data;
                    console.log(data)
                  },
                  error => this.error = error);
  }

  handleDelete(item: any): void{
    this.isLoading = true;
    this._quizService.deleteQuiz(item.id)
                  .subscribe(data => {
                    this.isLoading = false;
                    if(data[0] == "success"){
                      this._router.navigate(['/quiz']);
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

}
