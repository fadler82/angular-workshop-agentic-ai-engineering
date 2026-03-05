import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReadingListService } from './reading-list.service';
import { BookItemComponent } from './book-item.component';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BookItemComponent],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-7xl">
      <h1 class="text-3xl font-bold mb-10 text-blue-700 border-b pb-4 border-gray-200">Reading List</h1>

      <div *ngIf="isEmpty()"
           class="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p class="text-xl font-medium text-gray-600 mb-2">Your reading list is empty</p>
        <p class="text-gray-500 mb-4">Browse books and add them to your reading list</p>
        <a routerLink="/"
           class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
          Browse Books
        </a>
      </div>

      <div *ngIf="!isEmpty()"
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <div *ngFor="let book of books()" class="flex flex-col">
          <app-book-item [book]="book"></app-book-item>
          <button
            (click)="removeBook(book.id)"
            class="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 w-full">
            Remove from reading list
          </button>
        </div>
      </div>
    </div>
  `
})
export class ReadingListComponent {
  readonly books = this.readingListService.readingList;
  readonly isEmpty = () => this.readingListService.count() === 0;

  constructor(private readingListService: ReadingListService) {}

  removeBook(bookId: string): void {
    this.readingListService.removeBook(bookId);
  }
}
