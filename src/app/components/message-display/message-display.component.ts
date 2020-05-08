import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/models/IMessage';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit {

  msgClass: string;

  @Input() message: IMessage;

  constructor() { }

  ngOnInit(): void {
    
  }

  messageClass(): any{
    if(this.message.type == "error"){
      return {
        'alert-danger': true
      };
    }
    if(this.message.type == "success"){
      return {
        'alert-success': true    
      };
    }
    if(this.message.type == "warning"){
      return {
        'alert-warning': true
      };
    }
  }

}
