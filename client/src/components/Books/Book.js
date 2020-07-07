import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Preloader from '../layout/Preloader';
import { loadUser } from '../../store/actions/userAction';
import { 
  getBook, 
  clearBook, 
  addFinishedBook,
  getBookPersonalInfo,
  removeFinishedBook,
  setFinBookLoading,
} from '../../store/actions/bookAction';

const Book = (props) => {
  const {
    user: {
      isAuthenticated,
      user: { username }
    },
    book: {
      currentBook,
      currentBookLoading,
      isBookFinished,
      finBookLoading
    },
    // Redux methods
    getBook,
    clearBook,
    addFinishedBook,
    removeFinishedBook,
    getBookPersonalInfo,
    setFinBookLoading,
    loadUser,
    // Misc
    history,
    match
  } = props;
  
  useEffect(() => {
    getBook(match.params.book);
    if (isAuthenticated) getBookPersonalInfo(username, match.params.book)
    return () => clearBook();
    // eslint-disable-next-line
  }, [username, isAuthenticated])

  // Add current book to finished books of user
  const addFinBook = useCallback(async () => {
    setFinBookLoading();
    await addFinishedBook(username, match.params.book);
    loadUser();
    // eslint-disable-next-line
  }, [username, match])

  // Delete current book from finished books of user
  const remFinBook = useCallback(async () => {
    setFinBookLoading();
    await removeFinishedBook(username, match.params.book);
    loadUser();
    // eslint-disable-next-line
  }, [username, match])

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
                <button onClick={history.goBack} className="waves-effect blue-grey darken-4 btn-small">
                  <i className="material-icons left">keyboard_backspace</i>Back 
                </button>
                {isAuthenticated && (
                  (isBookFinished) ? (
                    <button 
                      onClick={remFinBook} 
                      className="waves-effect red darken-4 btn-small"
                      disabled={(finBookLoading) ? true : false}
                    >
                      <i className="material-icons left">delete</i>{'Remove from finished'}
                    </button>
                  ) : (
                    <button 
                      onClick={addFinBook} 
                      className="waves-effect light-green darken-4 btn-small" 
                      disabled={(finBookLoading) ? true : false}
                    >
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
  // Redux methods
  loadUser: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
  clearBook: PropTypes.func.isRequired,
  getBookPersonalInfo: PropTypes.func.isRequired,
  setFinBookLoading: PropTypes.func.isRequired,
  addFinishedBook: PropTypes.func.isRequired,
  removeFinishedBook: PropTypes.func.isRequired,
  // Redux state
  book: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // Misc
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  book: state.book,
  user: state.user,
})

export default connect(
  mapStateToProps, 
  { 
    getBook, 
    clearBook, 
    addFinishedBook, 
    getBookPersonalInfo, 
    removeFinishedBook,
    loadUser,
    setFinBookLoading
  }
)(Book);
