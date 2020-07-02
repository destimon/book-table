import googleBooks from 'google-books-search-2';
import {
  GET_BOOKS, 
  GET_BOOK,
  SET_CURRENT_BOOK_LOADING,
  SET_BOOKS_LOADING,
  CLEAR_BOOK,
  LOAD_BOOK_PERSONAL_INFO,
  ADD_FINISHED_BOOK,
  SET_FIN_BOOK_LOADING
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

export const getFinishedBooks = (book_ids) => async (dispatch) => {
  setBooksLoading();

  try {
    // Fill array of books with extended info
    let books = book_ids.map(async (el) => {
      let url = `https://www.googleapis.com/books/v1/volumes/${el.bookId}`
      let { data } = await axios.get(url)
      
      return {
        id: data.id,
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        thumbnail: _.get(data.volumeInfo, 'imageLinks.thumbnail'),
      }
    })

    Promise.all(books)
    .then(res => {
      dispatch({
        type: GET_BOOKS,
        payload: res,
      })
    })
  } catch (err) {
    
  }
}

// Get personal information about book from backend
export const getBookPersonalInfo = (username, bookId) => async (dispatch) => {
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem("token"),
    }
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/api/users/${username}/fin_books/${bookId}`,
      config,
    )

    dispatch({
      type: LOAD_BOOK_PERSONAL_INFO,
      payload: (res.data) ? true : false, 
    })
  } catch (err) {
    dispatch({
      type: LOAD_BOOK_PERSONAL_INFO,
      payload: false,
    })
  }
}

// Push finished book to the database
export const addFinishedBook = (username, bookId) => async (dispatch) => {
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem("token"),
    }
  }

  try {
    await axios.post(
      `http://localhost:3001/api/users/${username}/fin_books/${bookId}`,
      null,
      config,
    )
    
    dispatch({
      type: ADD_FINISHED_BOOK,
      payload: true,
    })
  } catch(err) {
    dispatch({
      type: ADD_FINISHED_BOOK,
      payload: false,
    })
  }
}

// Remove finished book from the database
export const removeFinishedBook = (username, bookId) => async (dispatch) => {
  const config = {  
    headers: {
      'x-auth-token': localStorage.getItem("token"),
    }
  }

  try {
    await axios.delete(
      `http://localhost:3001/api/users/${username}/fin_books/${bookId}`,
      config
    )

    dispatch({
      type: ADD_FINISHED_BOOK,
      payload: false,
    })
  } catch (err) {
    dispatch({
      type: ADD_FINISHED_BOOK,
      payload: true,
    })
  }
}

// Get chosen book
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
    dispatch ({
      type: GET_BOOK,
      payload: null,
    })
  }
}

export const setFinBookLoading = () => {
  return {
    type: SET_FIN_BOOK_LOADING,
  }
}

// Current book loading
export const setCurrentBookLoading = () => {
  return {
    type: SET_CURRENT_BOOK_LOADING,
  }
}

// Books loading
export const setBooksLoading = () => {
  return {
    type: SET_BOOKS_LOADING,
  }
}

// Clear all books in list
export const clearBooks = () => {
  return ({
    type: GET_BOOKS,
    payload: [],
  })
}

// Clear book in store
export const clearBook = () => {
  return {
    type: CLEAR_BOOK
  }
}