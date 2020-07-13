import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/main.scss';

const BookItem = (props) => {
  const {
    book: {
      thumbnail,
      authors,
      publishedDate
    },
    showBook,
    showAuthors,
    bookTitle,
    bookDescription
  } = props;

  return (
    <li className="collection-item book-item" onClick={showBook}>
      <div className="row">
        <div className="col s6 m4 l2 xl2">
          <img
            alt="book" 
            className="book-image" 
            src={thumbnail || '/noimage.jpeg'} 
          />
          <blockquote>{ authors && showAuthors() }</blockquote>
        </div>
        <div className="col s6 m8 l10 xl10">
          <h5>{bookTitle}</h5>
          <div className="divider"></div>
          <p>{bookDescription}</p>
          <small>{publishedDate}</small>
        </div>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  showBook: PropTypes.func.isRequired,
  showAuthors: PropTypes.func.isRequired,
  bookTitle: PropTypes.string,
  bookDescription: PropTypes.string
}


export default BookItem;
