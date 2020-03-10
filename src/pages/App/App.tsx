import React, { useEffect } from 'react'
import './App.css'
import routes from '../../routes/routes'
import Layout from '../../components/Layout'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Store } from '../../types'
import { getUserData } from '../../reducers/blog'

const App: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  // Selector
  const auth = useSelector(({ auth }: Store) => auth)
  const blog = useSelector(({ blog }: Store) => blog.blog)
  const error = useSelector(({ blog }: Store) => blog.error)

  //FIXME: Refactor this using routeMatch function
  const pathsWithoutSidebar = pathname.includes('/post/')
  const loggedInUser = auth.authToken
  const showSideBar = !!loggedInUser && !pathsWithoutSidebar

  useEffect(() => {
    if (auth.authToken && !error) {
      dispatch(getUserData())
    }
    if (error) {
      history.push('/login')
    }

  }, [dispatch, auth.authToken, error, history])

  return (
    <div className='App'>
      <Layout history={history} hasSidebar={showSideBar} blog={blog}>
        {routes()}
      </Layout>
    </div>
  )
}

export default App
