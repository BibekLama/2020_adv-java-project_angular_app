import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/Quiz';
import { IMessage } from '../../../models/IMessage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  quizs: Quiz[];

  message: IMessage;

  isLoading: boolean;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getQuizs();
  }

  getQuizs(): void {
    this.isLoading = true;
    this.quizService.getQuizs().subscribe( data => {
      this.quizs = data;
      this.isLoading = false;
    }, error => {
      this.message = {
        type: "error",
        message: error
      }
      this.isLoading = false;
    })
  }

  onClickExam(id: number){
    this.router.navigate(['exam/login', id]);
  }
}
