import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getBook } from '../../store/actions/bookAction';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';

const Book = (props) => {
  const {
    book: {
      currentBook,
      currentBookLoading,
    },
    getBook,
    match,
  } = props;
  
  useEffect(() => {
    getBook(match.params.book);
  }, [getBook, match.params.book])

  if (currentBookLoading || currentBook === null) {
    return <Preloader />
  }
  return (
    <div className="row">
      { !currentBookLoading && !currentBook ? (
        <div className="container">
          <h2>Error occured</h2>
          <i className="material-icons">error</i><span>Book doesnt exist!</span>
        </div>
        ) : (
          <Fragment>
            <div className="col s0 m4 l4 xl1">
              <div className="container">
                <img className="book-page-img" alt="book" src={currentBook.thumbnail || '/noimage.jpeg'}></img>
              </div>
            </div>
            <div className="col s12 m6 l8 xl11">
              <div className="container">
                <h5>{currentBook.title}</h5>
                <div className="divider"></div>
                <p>{currentBook.description}</p>
              </div>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

Book.propTypes = {
  match: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    book: state.book
  }
}

export default connect(
  mapStateToProps, 
  { getBook }
)(Book);
