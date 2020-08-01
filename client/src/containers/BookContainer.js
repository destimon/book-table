import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Book from "../components/Books/Book";
import { loadUserAsync } from "../store/actions/userAction";
import {
  getBook,
  clearBook,
  addFinishedBook,
  getBookPersonalInfo,
  removeFinishedBook,
  setFinBookLoading,
} from "../store/actions/bookAction";

const BookContainer = (props) => {
  const {
    user: {
      isAuthenticated,
      user: { username },
    },
    book: { currentBook, currentBookLoading, isBookFinished, finBookLoading },
    // Redux methods
    getBook,
    clearBook,
    addFinishedBook,
    removeFinishedBook,
    getBookPersonalInfo,
    setFinBookLoading,
    loadUserAsync,
    // Misc
    match,
    history,
  } = props;

  useEffect(() => {
    getBook(match.params.book);
    if (isAuthenticated) getBookPersonalInfo(username, match.params.book);
    return () => clearBook();
    // eslint-disable-next-line
  }, [username, isAuthenticated]);

  // Add current book to finished books of user
  const addFinBook = useCallback(async () => {
    setFinBookLoading();
    await addFinishedBook(username, match.params.book);
    await loadUserAsync();
    // eslint-disable-next-line
  }, [username, match]);

  // Delete current book from finished books of user
  const remFinBook = useCallback(async () => {
    setFinBookLoading();
    await removeFinishedBook(username, match.params.book);
    await loadUserAsync();
    // eslint-disable-next-line
  }, [username, match]);

  return (
    <Book
      currentBookLoading={currentBookLoading}
      currentBook={currentBook}
      isAuthenticated={isAuthenticated}
      remFinBook={remFinBook}
      addFinBook={addFinBook}
      finBookLoading={finBookLoading}
      isBookFinished={isBookFinished}
      history={history}
    />
  );
};

BookContainer.propTypes = {
  // Redux methods
  loadUserAsync: PropTypes.func.isRequired,
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
};

const mapStateToProps = (state) => ({
  book: state.book,
  user: state.user,
});

export default connect(mapStateToProps, {
  getBook,
  clearBook,
  addFinishedBook,
  getBookPersonalInfo,
  removeFinishedBook,
  loadUserAsync,
  setFinBookLoading,
})(BookContainer);
