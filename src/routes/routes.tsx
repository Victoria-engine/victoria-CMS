import React from 'react'
import { RouteProps, Route, Switch } from 'react-router'

// Pages
import Posts from '../pages/Posts'
import PostEdit from '../pages/PostEdit'
import CreatePost from '../pages/CreatePost'
import Settings from '../pages/Settings'
import Login from '../pages/Auth'
import Tutorial from '../pages/Tutorial'
import GateKeeper from '../pages/Auth/GateKeeper'

/**
 * Add routes to your web app here
 */
const routes: RouteProps[] = [
  { path: '/', component: GateKeeper(Posts) as any, exact: true },
  { path: '/post/:postID', component: GateKeeper(PostEdit) as any, exact: true },
  { path: '/new', component: GateKeeper(CreatePost) as any, exact: true },
  { path: '/settings', component: GateKeeper(Settings) as any, exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/welcome', component: GateKeeper(Tutorial) as any, exact: true },
]

export default () => (
  <Switch>
    {routes.map(route =>
      <Route path={route.path} exact={route.exact} component={route.component} key={`${route.path}route`} />)}
  </Switch>
)