import googleBooks from 'google-books-search-2';
import {
  GET_BOOKS, 
  GET_BOOK,
  SET_CURRENT_BOOK_LOADING,
  SET_BOOKS_LOADING,
} from '../actions/types';
import axios from 'axios';
import _ from 'lodash';

export const getBooks = (bookName) => async (dispatch) => {
  setBooksLoading();
  
  try {
    let res = await googleBooks.search(bookName, {
      limit: 30,
      field: 'title'
    })
    
    dispatch ({
      type: GET_BOOKS,
      payload: res,
    })
  } catch(err) {
    console.error(err);
  }
}

export const getBook = (bookId) => async (dispatch) => {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`

  setCurrentBookLoading();
  try {
    const { data: { volumeInfo }} = await axios.get(url)
    
    const data = {
      title: volumeInfo.title,
      description: volumeInfo.description,
      thumbnail: _.get(volumeInfo, 'imageLinks.thumbnail'),
    }
    
    dispatch ({
      type: GET_BOOK,
      payload: data,
    })
  } catch(err) {
    console.error(err);
  }
}

export const setCurrentBookLoading = () => {
  return {
    type: SET_CURRENT_BOOK_LOADING,
  }
}

export const setBooksLoading = () => {
  return {
    type: SET_BOOKS_LOADING,
  }
}

export const clearBooks = () => {
  return ({
    type: GET_BOOKS,
    payload: [],
  })
}