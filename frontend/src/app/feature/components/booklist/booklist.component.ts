import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../book.service';

import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})

export class BooklistComponent implements OnInit {

  constructor(protected bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe();
  }

  delete(book): void {
    this.bookService.books = this.bookService.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.bookService.books, event.previousIndex, event.currentIndex);
  }

}
