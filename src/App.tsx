import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <AuthPage />
          </Route>
          <Route exact path="/main">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
