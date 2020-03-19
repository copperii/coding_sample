import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Tools from '../pages/tools'
import ToolDetails from '../pages/toolDetail'
import About from '../pages/about'
import Contact from '../pages/contact'
import NotFound from '../pages/notFound'
import CoordsToMap from '../pages/coordsToMap'
import DrawOnMap from '../pages/drawOnMap'
import Users from '../pages/users'

const Routes = ({ loggedInUsername }) => {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route exact path="/tools">
        <Tools loggedInUsername={loggedInUsername} />
      </Route>
      <Route
        exact
        path="/tooldetails/:id"
        render={({ match }) => (
          <ToolDetails
            loggedInUsername={loggedInUsername}
            id={match.params.id}
          />
        )}
      />
      <Route exact path="/mapping">
        <CoordsToMap />
      </Route>
      <Route exact path="/drawonmap">
        <DrawOnMap loggedInUsername={loggedInUsername} />
      </Route>

      <Route path="/about">
        <About />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/contact">
        <Contact />
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
