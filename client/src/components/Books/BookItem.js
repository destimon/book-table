import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import '../../assets/main.scss';

const BookItem = ({ book }) => {
  const history = useHistory();

  const showBook = useCallback(() => {
    history.push(`/books/${book.id}`)
  }, [book, history]);

  const bookDescription = useMemo(() => (
    _.truncate(book.description, { 'length': 300 })
  ), [book.description]);

    const bookTitle = useMemo(() => (
      _.truncate(book.title, { 'length': 100 })
    ), [book.title])

  return (
    <li className="collection-item book-item" onClick={showBook}>
      <div className="row">
        <div className="col s6 m4 l2 xl2">
          <img
            alt="book" 
            className="book-image" 
            src={book.thumbnail || '/noimage.jpeg'} 
          />
          <blockquote>
            {
              book.authors &&
              book.authors.map((author, index) => (<p key={index}>{author}</p> ))
            }
          </blockquote>
        </div>
        <div className="col s6 m8 l10 xl10">
          <h5>{bookTitle}</h5>
          <div className="divider"></div>
          <p>{bookDescription}</p>
          <small>{book.publishedDate}</small>
        </div>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
}


export default BookItem;
