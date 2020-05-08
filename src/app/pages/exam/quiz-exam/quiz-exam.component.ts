import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { Quiz } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { IMessage } from 'src/app/models/IMessage';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';
import { Choice } from 'src/app/models/Choice';
import { MCQAnswer } from 'src/app/models/MCQAnswer';
import { Answer } from 'src/app/models/Answer';

@Component({
  selector: 'app-quiz-exam',
  templateUrl: './quiz-exam.component.html',
  styleUrls: ['./quiz-exam.component.css']
})
export class QuizExamComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;
  quiz: Quiz;
  user: User;
  message: IMessage;

  group: any = {};

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    let loginName = this.route.snapshot.paramMap.get('user');
    let quizId = this.route.snapshot.paramMap.get('id');
    
    this.getQuiz(+quizId)
    this.getUser(loginName)
  }

  // Check if field is valid
  // params: input field name
  // return: boolean value
  isFieldValid(field: string): boolean {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  // add css style in html tag
  // params: input field name
  // return: json value
  displayFieldCss(field: string): any {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  getQuiz(id: number) {
    this.quizService.getQuiz(id).subscribe(data=>{
      this.quiz = data
      this.quiz.questions.forEach((question, index) => {
        this.group['type'+index] = new FormControl(question.type);
        if(question.type == 'Multiple Choice'){
          question.choices.forEach((choice, i) => {
            this.group['question'+index+'choice'+i] = new FormControl(null);
          });
        }else{
          this.group['answer'+index] = new FormControl('', Validators.required);
        }
      });
      this.form = this.formBuilder.group(this.group)
    },error=>{
      this.message = {
        type: "error",
        message: error
      }
    })
  }

  getUser(name: string){
    this.userService.getUser(name).subscribe(data=>{
      this.user = data
    },error=>{
      this.message = {
        type: "error",
        message: error
      }
    })
  }

  // Validation function to check all the fields in the form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmitForm(): void{
    this.isLoading = true;
    console.log(this.form.valid)
    if(this.form.valid){    
      console.log(this.form)
      this.quiz.questions.forEach((question, index) => {
        let type = this.form.get('type'+index).value;
        if(type == "Multiple Choice"){
          let choices : any[] = []
          question.choices.forEach((choice, i) => {
            let ch = this.form.get('question'+index+'choice'+i).value;
            if(ch){
              choices.push(choice);
            }
          });
          let mcqanswer = new MCQAnswer(null, choices, this.user, question.id)
          this.examService.addMcqAnswer(mcqanswer).subscribe(data=>{
            console.log(data)
            this.isLoading = false;
          },error=>{
            this.message = {
              type: "error",
              message: error
            }
            this.isLoading = false;
          })
        }else{
          let answer = this.form.get('answer'+index).value;
          this.examService.addAnswer(new Answer(null,answer,question.id,this.user)).subscribe(data=>{
            console.log(data)
            this.isLoading = false;
          },error=>{
            this.message = {
              type: "error",
              message: error
            }
            
            this.isLoading = false;
          })
        }
      });
    }else{
      this.validateAllFormFields(this.form);
      this.isLoading = false;
    }
  }

}
