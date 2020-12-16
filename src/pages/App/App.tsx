import React, { useEffect } from 'react'
import './App.css'
import routes from '../../routes/routes'
import Layout from '../../components/Layout'
import { useHistory, useLocation, matchPath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RemoteDataStatus, Store } from '../../types'
import { getBlog, getConsumerKey, getUserData } from '../../reducers/blog'

const shouldPathHaveSidebar = (path: string) => {
  return matchPath(path, ['/welcome', '/post', '/login'])
}

const App: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const auth = useSelector(({ auth }: Store) => auth)
  const blog = useSelector(({ blog }: Store) => blog.blog)
  const error = useSelector(({ blog }: Store) => blog.error)

  const pathsWithoutSidebar = shouldPathHaveSidebar(pathname)
  const loggedInUser = auth.authToken
  const showSideBar = !!loggedInUser && !pathsWithoutSidebar

  useEffect(() => {
    if (error) {
      history.push('/login')
      return
    }

    if (!auth.authToken || blog.key.status === RemoteDataStatus.Fetching) return

    const invalidConsumerKey = blog.key.status === RemoteDataStatus.Failed && !blog.key.value
    if (invalidConsumerKey) {
      history.push('/welcome/1')
      return
    }

    const isTutorialOnGoing = history.location.pathname.includes('/welcome')
    if (isTutorialOnGoing) return

    const validConsumerKey = blog.key.status === RemoteDataStatus.Success
    if (validConsumerKey) {
      dispatch(getUserData())
      history.push('/')
      return
    }

    dispatch(getConsumerKey())
  }, [dispatch, auth.authToken, error, history, getUserData, getBlog, blog.key])

  return (
    <div className='App'>
      <Layout history={history} hasSidebar={showSideBar} blog={blog}>
        {routes()}
      </Layout>
    </div>
  )
}

export default App
