import React from 'react';
import Navbar from './components/layout/Navbar';
import './assets/main.scss';
import { Provider } from 'react-redux';
import store from './store/index';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Book from './components/Books/Book';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Authorization from './pages/Authorization';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container main">
        <Navbar />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/books/:book' component={Book}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/profile' component={Profile}></Route>
            <Route exact path='/auth' component={Authorization}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
