import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { 
  getBooks, 
  clearBooks, 
  setBooksLoading 
} from '../../store/actions/bookAction';

const SearchBook = (props) => {
  const {
    clearBooks,
    getBooks,
    setBooksLoading,
  } = props;
  
  const onSubmit = useCallback((e) => {
    const bookName = e.target.bookName.value;

    e.preventDefault();
    setBooksLoading();
    if (bookName) getBooks(bookName);
    // eslint-disable-next-line
  }, [getBooks]);

  return (
    <div className="row center-align">
      <form className="col s12" onSubmit={onSubmit}>
        <div className="input-field col s10">
          <i className="material-icons prefix">menu_book</i>
          <input placeholder="" id="bookName" type="text" 
          className="validate" />
          <label htmlFor="bookName">Book name</label>
        </div>
        <div className="input-field col s-2">
          <span 
            className="material-icons prefix icon-clear"
            onClick={clearBooks}
          >
            clear
          </span>
        </div>
      </form>
    </div>
  )
}

SearchBook.propTypes = {
  clearBooks: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  setBooksLoading: PropTypes.func.isRequired,
}

export default connect(null, { 
  getBooks, 
  clearBooks, 
  setBooksLoading
})(SearchBook);
