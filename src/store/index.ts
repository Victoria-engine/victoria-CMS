import { createStore, applyMiddleware, Middleware, compose } from 'redux'
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga'
import { createLogger } from 'redux-logger'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

const __PROD__ = process.env.NODE_ENV === 'production'

const sagaMiddleware = createSagaMiddleware()

/** Middlewares */
const middlewares = [sagaMiddleware]

/** Add a logger if it's not in production */
if (!__PROD__) {
  middlewares.push(createLogger() as SagaMiddleware<Middleware>)
}

// redux devtools
// @ts-ignore
const composeEnhancer = !__PROD__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancer(applyMiddleware(...middlewares))



/** Redux Store */
const store = createStore(combinedReducers, enhancer)

/** Run all the sagas */
combinedSagas.forEach((saga: Saga) => sagaMiddleware.run(saga))

export default store
