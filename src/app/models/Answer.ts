import { Question } from './Question';
import { User } from './User';

export class Answer {
    id: number;
    content: string;
    question: number;
    user: User

    constructor(
        id: number,
        content: string,
        question: number,
        user: User
    ){
        this.id = id;
        this.content = content;
        this.question = question
        this.user = user
    }
}