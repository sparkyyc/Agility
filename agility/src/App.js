import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SideNav from './components/SideNav'
import Dashboard from './components/Dashboard'
import PersonDetails from './components/PersonDetails'

import './App.css'

const App = (props) => {
  return(
    <SideNav>
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/user/:id" component={PersonDetails} />
    </SideNav>
  )
}


export default App
