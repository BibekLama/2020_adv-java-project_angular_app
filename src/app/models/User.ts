export class User {
    loginName: string;
    email: string;

    constructor(
        loginName: string,
        email: string
    ){
        this.loginName = loginName;
        this.email = email;
    }
}