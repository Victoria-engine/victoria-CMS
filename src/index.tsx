import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './pages/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider, defaultTheme } from 'evergreen-ui'
import { VictoriaTheme } from './types'


const ApplicationWrapper = (
  <>
    <Provider store={store}>
      <Router>
        <ThemeProvider value={{
          ...defaultTheme,
          spinnerColor: '#e9404c',
          primary: {
            color: 'white',
            background: '#e9404c',
          }
        } as VictoriaTheme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </>
)

ReactDOM.render(ApplicationWrapper, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
