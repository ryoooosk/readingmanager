import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  booksTitle$: Observable<Book[]>;
  booksAuthor$: Observable<Book[]>;
  private searchBooks = new Subject<string>();

  constructor(private bookService: BookService) { }

  search(word: string): void {
    this.searchBooks.next(word);
  }

  //implements OnInitとなっている場合、ngOnInitが必要。
  ngOnInit(): void {
    this.booksTitle$ = this.searchBooks.pipe(
        // 入力の後、400ms待って次の実行に移る
        debounceTime(400),
        // 直前のデータと同じ場合は処理を実行しない
        distinctUntilChanged(),
        // 検索ワードを受け取る度に、新しいObservableを返す
        switchMap((word: string) => this.bookService.searchBooksTitle(word)),
      );
    // this.books$.subscribe(book => this.books = book);
    // if(this.books$) {
    //   this.messageService.add(`title = ${this.searchWord} に合致する書籍が見つかりました`);
    // }

    this.booksAuthor$ = this.searchBooks.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((word: string) => this.bookService.searchBooksAuthor(word)),
    );
  }

}
