import React, { Fragment } from "react";
import SearchBook from "../components/Books/SearchBook";
import Books from "../components/Books/Books";

const Home = () => {
  return (
    <Fragment>
      <SearchBook />
      <Books />
    </Fragment>
  );
};

export default Home;
