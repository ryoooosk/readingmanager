import { Component, Input, OnInit, Output} from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BooklistComponent } from '../booklist/booklist.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  // booklist.componentのbooksプロパティを操作したい。Inputデコレーターを調べる
  book: Book;
  now: Date = new Date();
  nowYear: any = this.now.getFullYear();
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBook();

    this.bookForm = this.builder.group({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publishedDate: new FormControl('', [Validators.required, Validators.min(0)]),
      memorandum: new FormControl('', []),
    });

    console.log('DetailComponent ngOnInit!');
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('DetailComponent save start!');
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.updateBook(this.bookForm.value, id)
      .subscribe(() => this.goBack());
    console.log('DetailComponent save finish!');
  }

  delete(book: Book): void {
    console.log('DetailComponent delete start!');
    this.bookService.books = this.bookService.books.filter(b => b !== book);
    this.bookService.deleteBook(book)
      // subscribeの中でgoBackをするとbooksが更新された状態で/booklistに戻るのはなぜ？
      .subscribe(() => this.goBack());
      // .subscribe();
    console.log('DetailComponent delete finish!');
    // this.goBack();
  }

}
