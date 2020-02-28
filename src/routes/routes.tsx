import React from 'react'
import { RouteProps, Route, Switch } from 'react-router'

// Pages
import Posts from '../pages/Posts'
import PostEdit from '../pages/PostEdit'
import CreatePost from '../pages/CreatePost'
import Settings from '../pages/Settings'
import Login from '../pages/Auth'

/**
 * Add routes to your web app here
 */
const routes: RouteProps[] = [
  { path: '/posts', component: Posts, exact: true },
  { path: '/post/:postID', component: PostEdit, exact: true },
  { path: '/new', component: CreatePost, exact: true },
  { path: '/settings', component: Settings, exact: true },
  { path: '/login', component: Login, exact: true },
]

export default () => (
  <Switch>
    {routes.map(route =>
      <Route path={route.path} exact={route.exact} component={route.component} key={`${route.path}route`} />)}
  </Switch>
)