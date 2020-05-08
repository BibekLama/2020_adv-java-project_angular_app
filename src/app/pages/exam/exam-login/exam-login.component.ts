import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/Quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { IMessage } from 'src/app/models/IMessage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../../models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-exam-login',
  templateUrl: './exam-login.component.html',
  styleUrls: ['./exam-login.component.css']
})
export class ExamLoginComponent implements OnInit {

  form: FormGroup;

  quiz: Quiz;

  message: IMessage;

  isLoading: boolean;

  user: User;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let quizId = this.route.snapshot.paramMap.get('id')
    this.getQuiz(+quizId);
    this.form = this.formBuilder.group({
      loginName: [null, Validators.required],
      email: [null, [Validators.required,Validators.email]],
      code: [null, Validators.required]
    })
  }

  // Get quiz detail by id
  getQuiz(id: number): void{
    this.isLoading = true;
    this.quizService.getQuiz(id).subscribe(data => {
      this.quiz = data;
      this.isLoading = false;
    },error=>{
      this.message = {
        type: "error",
        message: error
      }
      this.isLoading = false;
    })
  }

  // Get user by login name 
  // If not save user
  doUserLogin(name: string):  void{
    this.isLoading = true
    this.userService.getUser(name).subscribe(data=>{
      if(data){
        this.isLoading=false
        this.router.navigate(['exam/quiz',this.quiz.id, data.loginName]);
      }else{
        this.userService.addUser(new User(this.form.get('loginName').value, this.form.get('email').value)).subscribe(d => {
          this.isLoading=false;
          this.router.navigate(['exam/quiz',this.quiz.id, d.loginName]);
        },error=>{
          this.message = {
            type: "error",
            message: error
          }
          this.isLoading=false
        });
      }
    },error=>{
      this.message = {
        type: "error",
        message: error
      }
      this.isLoading=false
    })
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

  onSubmit():void {
    this.isLoading = true;
    if (this.form.valid) {
      if(this.form.get('code').value == this.quiz.code){
        this.doUserLogin(this.form.get('loginName').value);
        // this.router.navigate(['exam/quiz',this.quiz.id,this.form.get('email').value])
      }else{
        this.message = {
          type: "error",
          message: "Quiz code is incorrect."
        }
      }
      this.isLoading = false;
    }else{
      this.validateAllFormFields(this.form)
      this.isLoading = false;
    }
  }

  // Validation function to check all the fields in the form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
