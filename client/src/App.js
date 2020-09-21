import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import ApolloProvider from './ApolloProvider';

import './App.scss';

import Home from './pages/home/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/auth';
import { MessageProvider } from './context/message';
import DynamicRoute from './util/DynamicRoute';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <Router>
            <Container className="pt-5">
              <Switch>
                <DynamicRoute exact path="/" component={Home} authenticated />
                <DynamicRoute path="/login" component={Login} guest />
                <DynamicRoute path="/register" component={Register} guest />
              </Switch>
            </Container>
          </Router>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App;
