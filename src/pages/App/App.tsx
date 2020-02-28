import React from 'react'
import './App.css'
import routes from '../../routes/routes'
import Layout from '../../components/Layout'
import { useHistory } from 'react-router-dom'

const App: React.FC = () => {
  const history = useHistory()

  return (
    <div className="App">
      <Layout history={history} hasSidebar={false}>
        {routes()}
      </Layout>
    </div>
  )
}

export default App
