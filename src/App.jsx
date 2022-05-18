import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import config from './config';
import Navbar from './Navbar';

import './main.css'

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '', window.location.origin));
  };

  return  (
    <div className="App">
      <header className="App-header">
        <p>Okta Authentication React app</p>
        <hr />
      <Security
      
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
      >
        <Navbar />
        <Container>
          <Route path="/" exact component={Home} />
          <SecureRoute path="/profile" component={Profile} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/login/callback" component={LoginCallback} />
        </Container>
    </Security>
    </header>
    </div>
  );
};

export default App;
