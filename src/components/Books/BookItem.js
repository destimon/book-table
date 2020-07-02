import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import '../../assets/main.scss';

const BookItem = ({ book }) => {
  const history = useHistory();

  const showBook = () => {
    console.log(book);
    history.push(`/books/${book.id}`)
  }

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
                <div>
                  {
                    book.authors &&
                    book.authors.map(author => (
                      (author)
                    ))
                  }
                </div>
              </blockquote>
          </div>
          <div className="col s6 m8 l10 xl10">
            <h5>{book.title}</h5>
            <div className="divider"></div>
            <p>Description...</p>
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
