import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list.component';
import { ReadingListComponent } from './books/reading-list.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'reading-list', component: ReadingListComponent },
  { path: '**', redirectTo: '' }
];
