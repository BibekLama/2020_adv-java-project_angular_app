import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @Input() modelID: string;
  @Input() itemID: number;
  @Input() itemName: string;
  @Output("handleDelete") handleDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.modelID);
  }

  deleteItem(): void{
    this.handleDelete.emit({id: this.itemID, name: this.itemName});
  }

}
