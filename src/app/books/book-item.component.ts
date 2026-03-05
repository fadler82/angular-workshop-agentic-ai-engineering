import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from './book';
import { ReadingListService } from './reading-list.service';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div class="relative aspect-[3/4] overflow-hidden">
        <img
          *ngIf="book.cover"
          [src]="book.cover"
          [alt]="book.title"
          class="w-full h-full object-contain bg-gray-100"
        />
        <div *ngIf="!book.cover" class="w-full h-full bg-gray-100 flex items-center justify-center">
          <span class="text-gray-500 text-sm font-medium">No cover available</span>
        </div>
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <h2 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{{ book.title }}</h2>
        <p *ngIf="book.subtitle" class="text-sm text-gray-600 mb-2 line-clamp-2">{{ book.subtitle }}</p>
        <div class="text-sm text-gray-700 mt-auto">
          <p>
            <span class="text-blue-700">{{ book.author }}</span>
          </p>
          <p *ngIf="book.isbn" class="text-xs text-gray-500 mt-2">ISBN: {{ book.isbn }}</p>
        </div>
        <button
          *ngIf="!isInReadingList()"
          (click)="addToReadingList()"
          class="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-200 w-full">
          Add to reading list
        </button>
        <span
          *ngIf="isInReadingList()"
          class="mt-3 text-center text-sm text-green-600 font-medium py-1">
          ✓ In reading list
        </span>
      </div>
    </div>
  `
})
export class BookItemComponent {
  @Input() book!: Book;

  constructor(private readingListService: ReadingListService) {}

  isInReadingList(): boolean {
    return this.readingListService.isInReadingList(this.book.id);
  }

  addToReadingList(): void {
    this.readingListService.addBook(this.book);
  }
}
