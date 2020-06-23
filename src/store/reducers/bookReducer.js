import {
  GET_BOOKS, 
  GET_BOOK,
  SET_CURRENT_BOOK_LOADING,
  SET_BOOKS_LOADING
} from '../actions/types';

const bookInitialState = {
  books: [],
  currentBook: null,
  booksLoading: false,
  currentBookLoading: true,
}

export const bookReducer = (state = bookInitialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        booksLoading: false,
      }
    case GET_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        currentBookLoading: false,
      }
    case SET_CURRENT_BOOK_LOADING:
      return {
        ...state,
        currentBookLoading: true,
      }
    case SET_BOOKS_LOADING:
      return {
        ...state,
        booksLoading: true,
      }
    default:
      return state
  }
}