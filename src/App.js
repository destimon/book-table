import React, { useEffect} from 'react';
import Navbar from './components/layout/Navbar';
import './assets/main.scss';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Book from './components/Books/Book';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Authorization from './pages/Authorization';
import PrivateRoute from './components/Routing/PrivateRoute';
import { loadUser } from './store/actions/userAction';
import { connect } from 'react-redux';

const App = ({loadUser}) => {
  useEffect(() => {
    loadUser();
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {loadUser})(App);
