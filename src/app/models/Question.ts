import { Quiz } from './Quiz';
import { Choice } from './Choice';
export class Question {
    id: number;
    title: string;
    quiz: Quiz;
    type: string;
    choices: Choice[];

    constructor(
        id: number,
        title: string,
        quiz: Quiz,
        type: string,
        choices: Choice[] = null
    ){
        this.id = id;
        this.title = title;
        this.quiz = quiz;
        this.type = type;
        this.choices = choices
    }
}