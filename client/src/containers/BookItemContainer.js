import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router';
import BookItem from '../components/Books/BookItem';
import PropTypes from 'prop-types';
import _ from 'lodash';

const BookItemContainer = ({ book }) => {
  const history = useHistory();

  const showBook = useCallback(() => {
    history.push(`/books/${book.id}`)
  }, [book, history]);

  const showAuthors = useCallback(() => (
    book.authors.map((author, index) => (<p key={index}>{author}</p> ))
  ), [book])

  const bookDescription = useMemo(() => (
    _.truncate(book.description, { 'length': 300 })
  ), [book.description]);

  const bookTitle = useMemo(() => (
    _.truncate(book.title, { 'length': 100 })
  ), [book.title])
 
  return <BookItem
    book={book}
    history={history}
    showBook={showBook}
    showAuthors={showAuthors}
    bookDescription={bookDescription}
    bookTitle={bookTitle}
  />
}

BookItemContainer.propTypes ={
  book: PropTypes.object
}

export default BookItemContainer
