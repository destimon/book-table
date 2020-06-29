import React, { useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types'

// Styles
import './assets/main.scss';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Authorization from './pages/Authorization';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/layout/Navbar';
import Book from './components/Books/Book';
import PrivateRoute from './components/Routing/PrivateRoute';

// Redux
import { loadUser } from './store/actions/userAction';
import { connect } from 'react-redux';

const App = ({loadUser}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <div className="container main">
      <Navbar />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/books/:book' component={Book}></Route>
          <Route exact path='/about' component={About}></Route>
          <PrivateRoute exact path='/profile' component={Profile}></PrivateRoute>
          <Route exact path='/auth' component={Authorization}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { loadUser })(App);
