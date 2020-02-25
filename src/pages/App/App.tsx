import React from 'react'
import './App.css'
import routes from '../../routes/routes'

function App() {
  return (
    <div className="App">
      {routes()}
    </div>
  )
}

export default App
