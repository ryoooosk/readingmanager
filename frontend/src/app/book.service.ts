import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from './message.service';

import { AuthService } from './core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];

  private apiUrl = 'http://localhost:8000/api/book/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  // auth.serviceからログインユーザー情報を持ってくる
  // private auth = getAuth();
  // public currentUser = this.auth.currentUser;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}${this.authService.currentUserId}`)
      .pipe(
        tap(_ => this.log('書籍情報を取得しました')),
        tap(books => this.books = books),
        tap(books => console.log(books)),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  registerBook(book: Book | any): Observable<Book> {
    book.uid = this.authService.currentUserId;
    const registerData = book;
    return this.http.post(this.apiUrl, JSON.stringify(registerData), this.httpOptions)
      .pipe(
        tap((newBook: Book) => this.log(`書籍データ(title=${newBook.title})を追加しました`)),
        tap(_ => console.log(registerData)),
        catchError(this.handleError<Book>('registerBook'))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.apiUrl}${this.authService.currentUserId}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(book => this.log(`書籍データ(title = ${book.title})を取得しました`)),
        tap(data => console.log(data)),
        catchError(this.handleError<Book>(`getBook id=${id}`))
      );
  }

  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Book>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`書籍データ(id=${id})を削除しました`)),
        catchError(this.handleError<Book>(`deleteBook id=${id}`))
      );

  }

  updateBook(book: Book, id: number): Observable<Book> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, book, this.httpOptions)
      .pipe(
        tap(_ => this.log(`書籍データ(id=${book.id})を変更しました`)),
        catchError(this.handleError<any>('updateBook'))
      );
  }

  searchBooksTitle(word: string): Observable<Book[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(`${this.apiUrl}${this.authService.currentUserId}/search?title=${word}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`title = ${word} に合致する書籍を検索しました。`)),
        catchError(this.handleError<Book[]>('searchBooksTitle', []))
      );
  }

  searchBooksAuthor(word: string): Observable<Book[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(`${this.apiUrl}search?author=${word}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`author = ${word} に合致する書籍を検索しました。`)),
        catchError(this.handleError<Book[]>('searchBooksAuthor', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} 失敗: ${error.message}`);
      return of(result as T);
    }
  }
}
