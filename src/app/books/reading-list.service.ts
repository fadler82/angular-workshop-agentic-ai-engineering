import { Injectable, signal, computed } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {
  private books = signal<Book[]>([]);

  readonly readingList = this.books.asReadonly();
  readonly count = computed(() => this.books().length);

  isInReadingList(bookId: string): boolean {
    return this.books().some(b => b.id === bookId);
  }

  addBook(book: Book): void {
    if (!this.isInReadingList(book.id)) {
      this.books.update(list => [...list, book]);
    }
  }

  removeBook(bookId: string): void {
    this.books.update(list => list.filter(b => b.id !== bookId));
  }
}
