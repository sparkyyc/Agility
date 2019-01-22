import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost"
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom"

import './index.css';

import App from './App';
import Dashboard from './components/Dashboard'

const client = new ApolloClient({
    link: new HttpLink({
        uri:'/graphql',
        opts: {
            credentials: 'same-origin'
        }
    }),
    dataIdFromObject: o => o.id
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
                    <Route path="/dashboard/" component={Dashboard} />
                </div>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
