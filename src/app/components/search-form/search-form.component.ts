import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;

  @Output("handleSearch") handleSearch = new EventEmitter();
  @Output("displayMessage") displayMessage = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchText: [null, Validators.required]
    });
  }

  onSearch(): void {
    if(this.form.valid){
      this.handleSearch.emit(this.form.get('searchText').value);
    }else{
      this.displayMessage.emit({type: "error", message:"Nothing to search"});
    }
  }

}
