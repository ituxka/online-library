import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ol-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  initForm() {
    this.bookForm = this.fb.group({

    });
  }

  ngOnInit() {
    this.initForm();
  }

  onClear() {
    this.bookForm.reset();
  }

  onSubmit() {
  }
}
