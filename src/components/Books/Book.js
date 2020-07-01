import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getBook, clearBook, addFinishedBook, getBookPersonalInfo } from '../../store/actions/bookAction';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import { Link } from 'react-router-dom';

const Book = (props) => {
  const {
    user: {
      isAuthenticated,
      user: {
        username,
      }
    },
    book: {
      currentBook,
      currentBookLoading,
      isBookFinished
    },
    getBook,
    clearBook,
    addFinishedBook,
    getBookPersonalInfo,
    match,
  } = props;
  
  useEffect(() => {
    getBook(match.params.book);
    if (username)
      getBookPersonalInfo(username, match.params.book)
    return () => {
      clearBook();
    }
    // eslint-disable-next-line
  }, [username])

  const addFinBook = () => {
    addFinishedBook(username, match.params.book);
  }

  if (currentBookLoading) {
    return <Preloader />
  } else {
    return (
      currentBook ? 
      (
        <div className="row">
          <div className="col s0 m4 l4 xl1">
            <div className="container">
              <img className="book-page-img" alt="book" src={currentBook.thumbnail || '/noimage.jpeg'}></img>
            </div>
          </div>
          <div className="col s12 m6 l8 xl11">
            <div className="container">
              <h5>{currentBook.title}</h5>
              <div className="divider">
              </div>
              <div className="btn-group">
                <Link to="/" className="waves-effect blue-grey darken-4 btn-small">
                  <i className="material-icons left">keyboard_backspace</i>Back 
                </Link>
                {isAuthenticated && (
                  (isBookFinished) ? (
                    <button onClick={addFinBook} className="waves-effect red darken-4 btn-small">
                      <i className="material-icons left">delete</i>{'Remove from finished'}
                    </button>
                  ) : (
                    <button onClick={addFinBook} className="waves-effect light-green darken-4 btn-small">
                      <i className="material-icons left">add</i>{'Add to finished'}
                    </button>
                  )
                )}
              </div>
              <p>{currentBook.description}</p>
            </div>
          </div>
        </div>
      ) 
      : 
      (
        <div className="container">
          <h2>Error occured</h2>
          <i className="material-icons">error</i><span>Book doesnt exist!</span>
        </div>
      )
    )
  }
}

Book.propTypes = {
  match: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired,
  clearBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    book: state.book,
    user: state.user,
  }
}

export default connect(
  mapStateToProps, 
  { getBook, clearBook, addFinishedBook, getBookPersonalInfo }
)(Book);
