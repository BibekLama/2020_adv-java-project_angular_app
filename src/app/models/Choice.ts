export class Choice {
    id: number;
    choice: string;
    correct: boolean;

    constructor(
        id: number,
        choice: string,
        correct: boolean
    ){
        this.id = id;
        this.choice = choice;
        this.correct = correct;
    }
}