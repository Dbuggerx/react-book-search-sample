import { Book } from '../redux/books/types';
import { SearchParam } from '../redux/searchParams/types';
import rawBookData from './bookData.json';

// Randomize the images
const bookData = rawBookData.map(b => ({
  ...b,
  cover: `${b.cover}?${Math.random() * 10}`
}));

function paramsHaveValues(params) {
  return params.category || params.genre || params.query;
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

function filterBookResults(params): Book[] {
  return bookData.filter(
    (book: Book) =>
      (params.category
        ? bookPropEqualsVal(book.genre.category, params.category)
        : true) &&
      (params.genre ? bookPropEqualsVal(book.genre.name, params.genre) : true) &&
      (params.query
        ? bookPropContainsVal(book.author.name, params.query) ||
          bookPropContainsVal(book.name, params.query)
        : true)
  );
}

export const pageSize = 10;

function calcAvailablePages(books: Book[]) {
  return Math.ceil(books.length / pageSize);
}

type BookResult = {
  totalPages: number;
  books: Book[];
};

export function getBookById(id: string): Book | undefined {
  return bookData.find((book: Book) => book.id === id);
}

export function* getRelatedBooks(bookId: string, qty: number): Iterable<Book> {
  const currentBook = getBookById(bookId);
  if (!currentBook) return;
  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const book of bookData) {
    if (
      bookPropEqualsVal(book.genre.category, currentBook.genre.category) &&
      bookPropEqualsVal(book.genre.name, currentBook.genre.name) &&
      !bookPropEqualsVal(book.id, currentBook.id)
    )
      yield book;
    if (results.length >= qty) break; // Enough results found, no need to continue
  }
}

export function getPagedBooksSearch(params): BookResult {
  const currentIndex = (params.page - 1 || 0) * pageSize;
  const books = paramsHaveValues(params) ? filterBookResults(params) : bookData;
  return {
    totalPages: calcAvailablePages(books),
    books: books.slice(currentIndex, currentIndex + pageSize)
  };
}

export const bookCategories: SearchParam[] = [
  { id: 1, label: 'Fiction' },
  { id: 2, label: 'Non-Fiction' }
];

export const bookGenres: SearchParam[] = [
  {
    id: 1,
    label: 'Arts'
  },
  {
    id: 2,
    label: 'Biographies'
  },
  {
    id: 3,
    label: 'Business'
  },
  {
    id: 4,
    label: 'Calendars'
  },
  {
    id: 5,
    label: "Children's Books"
  },
  {
    id: 6,
    label: 'Christian Books'
  },
  {
    id: 7,
    label: 'Comics'
  },
  {
    id: 8,
    label: 'Computers'
  },
  {
    id: 9,
    label: 'Cookbooks'
  },
  {
    id: 10,
    label: 'Education'
  },
  {
    id: 11,
    label: 'Engineering'
  },
  {
    id: 12,
    label: 'Fantasy'
  },
  {
    id: 13,
    label: 'Health'
  },
  {
    id: 14,
    label: 'History'
  },
  {
    id: 15,
    label: 'Humor'
  },
  {
    id: 16,
    label: 'Law'
  },
  {
    id: 17,
    label: 'Literature'
  },
  {
    id: 18,
    label: 'Medical Books'
  },
  {
    id: 19,
    label: 'Parenting'
  },
  {
    id: 20,
    label: 'Politics'
  },
  {
    id: 21,
    label: 'Relationships'
  },
  {
    id: 22,
    label: 'Religion'
  },
  {
    id: 23,
    label: 'Romance'
  },
  {
    id: 24,
    label: 'Science Fiction'
  },
  {
    id: 25,
    label: 'Sciences'
  },
  {
    id: 26,
    label: 'Self-Help'
  },
  {
    id: 27,
    label: 'Social Sciences'
  },
  {
    id: 28,
    label: 'Spirituality'
  },
  {
    id: 29,
    label: 'Sports'
  },
  {
    id: 30,
    label: 'Technology'
  },
  {
    id: 31,
    label: 'Teen'
  },
  {
    id: 32,
    label: 'Thriller'
  },
  {
    id: 33,
    label: 'Travel'
  }
];
