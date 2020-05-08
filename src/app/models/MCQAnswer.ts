import { Choice } from './Choice';
import { User } from './User';
import { Question } from './Question';

export class MCQAnswer {
    id: number;
    choices: Choice[];
    user: User;
    question: number

    constructor(
        id: number,
        choices: Choice[],
        user: User,
        question: number
    ){
        this.id = id;
        this.choices = choices;
        this.user = user;
        this.question = question;
    }
}