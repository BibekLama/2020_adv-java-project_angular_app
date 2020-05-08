import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { IMessage } from '../../../models/IMessage';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];

  message: IMessage;

  isLoading: boolean;

  constructor(
    private userService: UserService
  ) {  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void{
    this.isLoading = true;
    this.userService.getUsers()
                  .subscribe(data => {
                    console.log(data)
                    this.users = data;
                    this.isLoading = false;
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                    this.isLoading = false;
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
                      this.getUsers();
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

  handleSearch(text: string): void{
    this.isLoading = true;
    this.userService.searchUser(text)
                  .subscribe(data => {
                    this.users = data;
                    if(this.users.length > 0){
                      this.message = {
                        type: "success",
                        message: "User found on title contains '"+text+"'."
                      }
                    }else{
                      this.message = {
                        type: "warning",
                        message: "No User found on title contains '"+text+"'."
                      }
                    }
                    this.isLoading = false;
                  },
                  error => {
                    this.message = {
                      type: "error",
                      message: error
                    }
                    this.isLoading = false;
                  });
  }

  displayMessage(message: IMessage): void {
    this.message = message;
  }

}
