// @flow

import bookData from './bookData.json';
import type { Book, SearchParams } from '../redux/books/types';

function paramsHaveValues(params: SearchParams) {
  return (params.category || params.genre || params.query);
}

function normalizeString(str: string) {
  return decodeURIComponent(str.toLowerCase().replace(/\+/g, ' ')).trim();
}

function bookPropEqualsVal(bookProp: string, val: string) {
  return val ? normalizeString(bookProp) === normalizeString(val) : true;
}

function bookPropContainsVal(bookProp: string, val: string) {
  return val ? normalizeString(bookProp).indexOf(normalizeString(val)) !== -1 : true;
}

function filterBookResults(params: SearchParams): Book[] {
  return bookData.filter(
    book => (params.category ? bookPropEqualsVal(book.genre.category, params.category) : true)
      && (params.genre ? bookPropEqualsVal(book.genre.name, params.genre) : true)
      && (params.query
        ? bookPropContainsVal(book.author.name, params.query)
          || bookPropContainsVal(book.name, params.query)
        : true)
  );
}

export const pageSize = 8;

function calcAvailablePages(books: Book[]) {
  return Math.ceil(books.length / pageSize);
}

type BookResult = {
  totalPages: number,
  books: Book[]
};

export function getBookById(id: string): Book {
  return bookData.filter(book => book.id === id);
}

export function* getRelatedBooks(bookId: string, qty: number): Iterable<Book> {
  const currentBook = getBookById(bookId);
  const results = [];
  for (let i = 0; i < bookData.length; i++) {
    const book = bookData[i];
    if (
      bookPropEqualsVal(book.genre.category, currentBook.genre.category)
      && bookPropEqualsVal(book.genre.name, currentBook.genre.name)
      && !bookPropEqualsVal(book.id, currentBook.id)
    )
      yield book;
    if (results.length >= qty) break; // Enough results found, no need to continue
  }
}

export function getPagedBooksSearch(params: SearchParams): BookResult {
  const currentIndex = (params.page - 1 || 0) * pageSize;
  const books = paramsHaveValues(params) ? filterBookResults(params) : bookData;
  return {
    totalPages: calcAvailablePages(books),
    books: books.slice(currentIndex, currentIndex + pageSize)
  };
}

export const bookCategories = ['Fiction', 'Non-Fiction'];

export const bookGenres = [
  'Arts',
  'Biographies',
  'Business',
  'Calendars',
  "Children's Books",
  'Christian Books',
  'Comics',
  'Computers',
  'Cookbooks',
  'Education',
  'Engineering',
  'Fantasy',
  'Health',
  'History',
  'Humor',
  'Law',
  'Literature',
  'Medical Books',
  'Parenting',
  'Politics',
  'Relationships',
  'Religion',
  'Romance',
  'Science Fiction',
  'Sciences',
  'Self-Help',
  'Social Sciences',
  'Spirituality',
  'Sports',
  'Technology',
  'Teen',
  'Thriller',
  'Travel'
];
