import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


const PilihDosbing = lazy(() => import('./pages/pilih_dosbing'))
const DaftarDosbing = lazy(() => import('./pages/daftar_dosbing'))
const About = lazy(() => import('./pages/about'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/reksis"></Redirect>
          </Route>
          
          <Route exact path="/reksis" component={ PilihDosbing } />
          <Route exact path="/dosbing" component={ DaftarDosbing } />
          <Route exact path="/about" component={ About } />          

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
