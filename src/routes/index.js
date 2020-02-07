import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Tools from '../pages/tools'
import ToolDetails from '../pages/toolDetail'
import About from '../pages/about'
import NotFound from '../pages/notFound'

const Routes = () => {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route exact path="/tools">
        <Tools />
      </Route>
      <Route
        exact
        path="/tooldetails/:id"
        render={({ match }) => <ToolDetails id={match.params.id} />}
      />
      <Route path="/about">
        <About />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}
export default Routes
