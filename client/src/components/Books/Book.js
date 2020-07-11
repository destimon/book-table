import React from 'react'
import PropTypes from 'prop-types'
import Preloader from '../layout/Preloader';

const Book = (props) => {
  const {
    currentBookLoading,
    currentBook,

    isAuthenticated,

    remFinBook,
    addFinBook,
    finBookLoading,

    isBookFinished,
    history
  } = props;

  if (currentBookLoading) return <Preloader />

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

Book.propTypes = {
  currentBookLoading: PropTypes.bool.isRequired,
  currentBook: PropTypes.object,

  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,

  remFinBook: PropTypes.func.isRequired,
  addFinBook: PropTypes.func.isRequired,
  finBookLoading: PropTypes.bool.isRequired,

  isBookFinished: PropTypes.bool,
}

export default Book;
