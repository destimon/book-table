import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import '../../assets/main.scss';

const BookItem = ({ book }) => {
  const history = useHistory();

  const showBook = () => {
    history.push(`/books/${book.id}`)
  }

  return (
      <li className="collection-item book-item" onClick={showBook}>
        <div className="row">
          <div className="col s3">
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
              </div></blockquote>
          </div>
          <div className="col s9">
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
