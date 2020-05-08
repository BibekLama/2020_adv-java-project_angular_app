import { Question } from './Question';

export class Quiz {
    id: number;
    title: string;
    code: string;
    questions: Question[];

    constructor(
        id: number,
        title: string,
        code: string,
        questions: Question[]
    ){
        this.id = id;
        this.title = title;
        this.code = code;
        this.questions = questions
    }
}