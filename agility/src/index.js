import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom"
import { InMemoryCache } from "apollo-cache-inmemory"

import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './App';
import Dashboard from './components/Dashboard'

const link = createHttpLink({ 
    uri: "http://localhost:4000/graphql", 
    credentials: 'same-origin'
     });

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    dataIdFromObject: o => o.id,
    fetchOptions: {
        mode: 'no-cors',
      },
})

const Login = () => <h2>Login</h2>;
const Signup = () => <h2>Sign Up</h2>;

const Root = () => {
    return (
        <ApolloProvider client={client} >
            <Router>
                <div>
                    <Route path="/" exact component={App} />
                    <Route path="/login/" component={Login} />
                    <Route path="/signup/" component={Signup} />
                    <Route path="/dashboard/:id" component={Dashboard} />
                </div>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
