import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import SideNav from "./components/SideNav"
import Dashboard from "./components/Dashboard/Dashboard"
import Skills from "./components/Skills/Skills"
import TeamOverview from "./components/TeamOverview/TeamOverview"
import TeamForm from "./components/Forms/TeamForm"
import RequireAuth from "./components/Auth/RequireAuth"

import "./App.css"

const App = props => {
  return (
    <SideNav currentUser={props.currentUser}>
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
      <Route
        path="/skills"
        render={prop => <Skills {...prop} currentUser={props.currentUser} />}
      />
      <Route
        path="/team/:id"
        render={prop => (
          <TeamOverview {...prop} currentUser={props.currentUser} />
        )}
      />
      <Route
        path="/teamEdit/"
        render={prop => <TeamForm {...prop} currentUser={props.currentUser} />}
      />
    </SideNav>
  )
}

export default App
