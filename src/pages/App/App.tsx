import React from 'react'
import './App.css'
import routes from '../../routes/routes'
import Layout from '../../components/Layout'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Store } from '../../types'

const App: React.FC = () => {
  const history = useHistory()

  // Selector
  const auth = useSelector(({ auth }: Store) => auth)

  const loggedInUser = auth.authToken

  return (
    <div className="App">
      <Layout history={history} hasSidebar={!!loggedInUser}>
        {routes()}
      </Layout>
    </div>
  )
}

export default App
