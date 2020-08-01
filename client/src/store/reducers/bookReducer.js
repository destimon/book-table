import {
  GET_BOOKS,
  GET_BOOK,
  SET_CURRENT_BOOK_LOADING,
  SET_BOOKS_LOADING,
  CLEAR_BOOK,
  ADD_FINISHED_BOOK,
  LOAD_BOOK_PERSONAL_INFO,
  SET_FIN_BOOK_LOADING,
} from "../actions/types";

const bookInitialState = {
  books: [],
  booksLoading: false,

  currentBook: null,
  currentBookLoading: true,

  isBookFinished: null,
  finBookLoading: false,
};

export const bookReducer = (state = bookInitialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        booksLoading: false,
      };
    case GET_BOOK:
      return {
        ...state,
        currentBook: action.payload,
        currentBookLoading: false,
      };
    case SET_CURRENT_BOOK_LOADING:
      return {
        ...state,
        currentBookLoading: true,
      };
    case SET_BOOKS_LOADING:
      return {
        ...state,
        booksLoading: true,
      };
    case SET_FIN_BOOK_LOADING:
      return {
        ...state,
        finBookLoading: true,
      };
    case LOAD_BOOK_PERSONAL_INFO:
      return {
        ...state,
        isBookFinished: action.payload,
      };
    case ADD_FINISHED_BOOK:
      return {
        ...state,
        isBookFinished: action.payload,
        finBookLoading: false,
      };
    case CLEAR_BOOK:
      return {
        ...state,
        currentBook: null,
        currentBookLoading: true,
      };
    default:
      return state;
  }
};
