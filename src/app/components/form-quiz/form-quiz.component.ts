import { Component, OnChanges, Input, Output, EventEmitter, SimpleChange, SimpleChanges} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';
import { Choice } from 'src/app/models/Choice';
import { Question } from 'src/app/models/Question';
import { Quiz } from 'src/app/models/Quiz';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.css']
})
export class FormQuizComponent implements OnChanges {

  form: FormGroup;
  isLoading: boolean;
  @Output('onSubmit') onSubmit =  new EventEmitter();
  @Input() quiz: Quiz;

  types = ["Open Content", "Multiple Choice"];

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.quiz)
    this.form = this.formBuilder.group({
      quizID: [null],
      title: [null, Validators.required],
      code: [null, Validators.required],
      questions: this.formBuilder.array([])
    });
    this.generateCode();
  }

  // Generate random code in inputfield
  generateCode(): void {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz1234567890"
    let code = this.quizService.makeRandomString(6,possible);
    this.form.patchValue({code});
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

  // get questions input fields array
  // return: question formgroup aarray
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  // get choices of question field
  // param: question field array index
  // return: choices field array
  choices(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('choices') as FormArray;
  }

  // add question input field in the quiz form
  addQuestionInput() {
    this.questions.push(this.formBuilder.group({
        questID: [null],
        question: [null, Validators.required],
        type: [this.types[0], Validators.required],
        choices: this.formBuilder.array([])
    }));
  }

  // remove question input fields from the quiz form
  deleteQuestion(index) {
    this.questions.removeAt(index);
  }

  // Check if question field is valid
  // params: input field name, index
  // return: boolean value
  isQuestFieldValid(field: string, index: number): boolean {
    return !this.questions.at(index).get(field).valid && this.questions.at(index).get(field).touched;
  }

  // add css style in html tag
  // params: input field name
  // return: json value
  displayQuestFieldCss(field: string, index: number): any {
    return {
      'has-error': this.isQuestFieldValid(field, index),
      'has-feedback': this.isQuestFieldValid(field, index)
    };
  }

  // add choices input field in the question form
  addChoiceInput(questIndex: number) {
    this.choices(questIndex).push(this.formBuilder.group({
        choiceID: [null],
        choice: [null, Validators.required],
        correct: [false, Validators.required]
    }));
  }

  // remove choice input field from the quiz form
  deleteChoice(questionIndex: number, choiceIndex: number) {
    this.choices(questionIndex).removeAt(choiceIndex);
  }

  // Check if choice field is valid
  // params: input field name, index
  // return: boolean value
  isChoiceFieldValid(field: string, questIndex: number, choiceIndex: number): boolean {
    return !this.choices(questIndex).at(choiceIndex).get(field).valid && this.choices(questIndex).at(choiceIndex).get(field).touched;
  }

  // add css style in html tag
  // params: input field name
  // return: json value
  displayChoiceFieldCss(field: string, questIndex: number, choiceIndex: number): any {
    return {
      'has-error': this.isChoiceFieldValid(field, questIndex, choiceIndex),
      'has-feedback': this.isChoiceFieldValid(field, questIndex, choiceIndex)
    };
  }

  isMultipleChoice(questionIndex: number): boolean {
    let selectedValue = this.questions.at(questionIndex).get('type').value
    if(selectedValue === 'Multiple Choice'){
      return true
    }
    this.choices(questionIndex).clear();
    return  false;
  }

  // isCorrectChoice(questionIndex: number, choiceIndex: number): boolean {
  //   let selectedValue = this.choices(questionIndex).at(choiceIndex).get('correct').value
  //   if(selectedValue){
  //     return true
  //   }
  //   return  false;
  // }

  // Submit form
  onSubmitForm(): void{
    this.isLoading = true;
    if (this.form.valid) {
      // console.log(JSON.stringify(this.form.value.questions));
      let formFields = this.form.value;
      let questionArray: Question[] = []
      for(let quest of formFields.questions){
        let choiceArray: Choice[] = [];
        for(let choice of quest.choices){
          choiceArray.push(new Choice(choice.choiceID, choice.choice, choice.correct))
        }
        questionArray.push(new Question(quest.questID,quest.question,null,quest.type,choiceArray))
      }
      let quizData: Quiz = new Quiz(formFields.quizID,formFields.title,formFields.code, questionArray)
      // console.log(quizData)
      this.onSubmit.emit(quizData);
      this.isLoading = false;
    }else{
      this.validateAllFormFields(this.form);
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

  ngOnChanges(changes: SimpleChanges): void {
    const currentQuiz: SimpleChange = changes.quiz;
    // console.log(changes)
    if(currentQuiz.currentValue){
      this.quiz = currentQuiz.currentValue;
      this.insertQuizDetail(this.quiz);
    }
  }

  // On reset form
  onResetForm(): void {
    if(this.quiz){
      this.insertQuizDetail(this.quiz)
    }else{
      this.form.reset()
    }
  }

  // Insert quiz detail in the form
  insertQuizDetail(quiz : Quiz): void {
    this.form = this.formBuilder.group({
      quizID: [quiz.id],
      title: [quiz.title, Validators.required],
      code: [quiz.code, Validators.required],
      questions: this.formBuilder.array([])
    });

    let index = 0
    for(let quest of quiz.questions){
      this.questions.push(this.formBuilder.group({
          questID: [quest.id],
          question: [quest.title, Validators.required],
          type: [quest.type, Validators.required],
          choices: this.formBuilder.array([])
      }))
      // console.log(quest.type)
      for(let choice of quest.choices){
        this.choices(index).push(this.formBuilder.group({
            choiceID: [choice.id],
            choice: [choice.choice, Validators.required],
            correct: [choice.correct, Validators.required]
        }));
      }
      index++;
    }
  }

}
