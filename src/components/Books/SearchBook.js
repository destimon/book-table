import React from 'react'
import { getBooks, clearBooks } from '../../store/actions/bookAction';
import { connect } from 'react-redux';

const SearchBook = (props) => {
  const {
    clearBooks,
    getBooks,
  } = props;
  
  const onSubmit = (e) => {
    const bookName = e.target.bookName.value;

    e.preventDefault();
    if (bookName) {
      getBooks(bookName);
    }
  }

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

export default connect(null, { getBooks, clearBooks })(SearchBook);
