import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import SideNav from "./components/SideNav"
import Dashboard from "./components/Dashboard"
import PersonDetails from "./components/PersonDetails"
import Skills from "./components/Skills/Skills"
import RequireAuth from "./components/RequireAuth"

import "./App.css"

const App = props => {
  console.log(props)
  return (
    <SideNav>
      <Switch>
        <Route
          path="/dashboard/:id"
          render={prop => (
            <Dashboard {...prop} currentUser={props.currentUser} />
          )}
        />
        <Redirect
          from="/dashboard/"
          to={`/dashboard/${props.currentUser.id}`}
        />
      </Switch>
      {/* <Route path="/user/:id" component={RequireAuth(PersonDetails)} /> */}
      <Route
        path="/skills"
        render={prop => <Skills {...prop} currentUser={props.currentUser} />}
      />
    </SideNav>
  )
}

export default App
