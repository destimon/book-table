import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { getBooks } from '../../store/actions/bookAction';
import BookItem from './BookItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types'

const Books = (props) => {
  const {
    book: {
      books,
      booksLoading
    }
  } = props;

  if (booksLoading) {
    return <Preloader />
  }

  return (
    <Fragment>
      {
        (books.length > 0) ? (
          <ul className="collection">
          {
            books.map((book, index) => (
              <BookItem key={index} book={book} />
            ))
          }
        </ul>
        ) : (
          <div className="container">
            <i className="material-icons">error</i><span>No data</span>
          </div>
        )
      }
    </Fragment>
  )
}

Books.propTypes = {
  book: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ book: state.book })

export default connect(mapStateToProps, { getBooks })(Books);
