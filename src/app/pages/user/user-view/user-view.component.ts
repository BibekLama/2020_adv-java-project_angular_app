import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/app/models/IMessage';
import { User } from 'src/app/models/User';
import { ExamService } from 'src/app/services/exam.service';
import { Answer } from 'src/app/models/Answer';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  message: IMessage
  isLoading: boolean
  user: User
  answers: any[] = []
  mcqanswers: any[] = []
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private examService: ExamService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    let loginName = this.route.snapshot.paramMap.get('id');
    this.getUser(loginName);
    this.getUserAnswer(loginName);
    this.getUserMCQAnswer(loginName);
  }

  getUser(id: string): void {
    this.isLoading = true;
    this.userService.getUser(id).subscribe(data=>{
      this.user = data
      this.isLoading = false
    },error=>{
      this.message = {
        type: "error",
        message: error
      }
    })
  }

  getUserAnswer(id: string){
    this.examService.getUserAnswer(id).subscribe(data=>{
      for(let item of data){
        this.questionService.getQuestion(item.question).subscribe(d => {
          this.answers.push({
            answer: item,
            question: d
          })
        })
      }
      
    });
  }

  getUserMCQAnswer(id: string){
    this.examService.getUserMCQAnswer(id).subscribe(data=>{
      console.log(data)
      for(let item of data){
        this.questionService.getQuestion(item.question).subscribe(d => {
          this.mcqanswers.push({
            mcqanswer: item,
            question: d
          })
        })
      }
      
    });
  }

  handleDelete(item: any): void{
    this.isLoading = true;
    this.userService.deleteUser(item.id)
                  .subscribe(data => {
                    this.isLoading = false;
                    if(data[0] == "success"){
                      this.message = {
                        type: "success",
                        message: "Successfully deleted "+item.name
                      }
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
