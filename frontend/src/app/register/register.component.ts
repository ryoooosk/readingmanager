import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public books: Book[] = [];
  bookForm: FormGroup;
  now: Date = new Date();
  nowYear: any = this.now.getFullYear();

  constructor(
    private bookService: BookService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookForm = this.builder.group({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publishedDate: new FormControl('', [Validators.required, Validators.min(0)]),
      memorandum: new FormControl('', []),
    });
  }

  register(): void {
    if (!this.bookForm) { return; }
    this.bookService.registerBook(this.bookForm.value)
      .subscribe(book => {
        this.books.push(book);
      });
  }

}
