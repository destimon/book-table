import {
  GET_BOOKS, 
  GET_BOOK,
  SET_CURRENT_BOOK_LOADING,
  SET_BOOKS_LOADING,
  CLEAR_BOOK,
  ADD_FINISHED_BOOK
} from '../actions/types';

const bookInitialState = {
  books: [],
  currentBook: null,
  isBookFinished: null,
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
    case ADD_FINISHED_BOOK:
      return {
        ...state,
        isBookFinished: action.payload,
      }
    case CLEAR_BOOK:
      return {
        ...state,
        currentBook: null,
        currentBookLoading: true,
      }
    default:
      return state
  }
}