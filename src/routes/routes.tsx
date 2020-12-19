import React from 'react'
import { RouteProps, Route, Switch } from 'react-router'
import GateKeeper from '../components/GateKeeper'

// Pages
import Posts from '../pages/Posts'
import PostEdit, { PostCreate } from '../pages/PostEdit'
import Drafts from '../pages/Drafts'
import Settings from '../pages/Settings'
import Login from '../pages/Login'
import Tutorial from '../pages/Tutorial'
import Account from '../pages/Account'


const routes: RouteProps[] = [
  { path: '/', component: GateKeeper(Posts), exact: true },
  { path: '/post/new', component: GateKeeper(PostCreate), exact: true },
  { path: '/post/:postID', component: GateKeeper(PostEdit), exact: true },
  { path: '/drafts', component: GateKeeper(Drafts), exact: true },
  { path: '/settings', component: GateKeeper(Settings), exact: true },
  { path: '/account', component: GateKeeper(Account), exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/welcome/:step', component: GateKeeper(Tutorial), exact: true },
]

export default () => (
  <Switch>
    {routes.map(route =>
      <Route
        key={`${route.path}route`}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />)}
  </Switch>
)