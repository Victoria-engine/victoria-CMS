import React from 'react'
import { RouteProps, Route, Switch } from 'react-router'

// Pages
import Posts from '../pages/Posts'
import PostEdit from '../pages/PostEdit'

/**
 * Add routes to your web app here
 */
const routes: RouteProps[] = [
  { path: '/', component: Posts, exact: true },
  { path: '/post/:postID', component: PostEdit, exact: true },
]

export default () => (
  <Switch>
    {routes.map(route =>
      <Route path={route.path} exact={route.exact} component={route.component} key={`${route.path}route`} />)}
  </Switch>
)