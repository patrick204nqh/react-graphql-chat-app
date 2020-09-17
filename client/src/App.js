import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ApolloProvider from './ApolloProvider';

import './App.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/auth';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Container className="pt-5">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App;
