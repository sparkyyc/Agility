import React, { Component } from "react"
import { Route } from "react-router-dom"
import SideNav from "./components/SideNav"
import Dashboard from "./components/Dashboard"
import PersonDetails from "./components/PersonDetails"
import Skills from "./components/Skills/Skills"
import RequireAuth from "./components/RequireAuth"

import "./App.css"

const App = props => {
  return (
    <SideNav>
      <Route path="/dashboard/:id" component={RequireAuth(Dashboard)} />
      <Route path="/user/:id" component={RequireAuth(PersonDetails)} />
      <Route path="/skills" component={RequireAuth(Skills)} />
    </SideNav>
  )
}

export default App
