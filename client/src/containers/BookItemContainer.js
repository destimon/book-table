import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router';
import BookItem from '../components/Books/BookItem';
import PropTypes from 'prop-types';
import _ from 'lodash';

const BookItemContainer = (props) => {
  const {
    book,
    book: {
      id,
      title,
      description,
      authors
    }
  } = props;
  const history = useHistory();

  const showBook = useCallback(() => {
    history.push(`/books/${id}`)
  }, [id, history]);

  const showAuthors = useCallback(() => (
    authors.map((author, index) => (<p key={index}>{author}</p> ))
  ), [authors])

  const bookDescription = useMemo(() => (
    _.truncate(description, { 'length': 300 })
  ), [description]);

  const bookTitle = useMemo(() => (
    _.truncate(title, { 'length': 100 })
  ), [title])
 
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
