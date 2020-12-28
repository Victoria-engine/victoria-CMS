import React from 'react'
import { GatekeeperProps } from '../../types'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'evergreen-ui'

const GateKeeper: React.FC<GatekeeperProps> = ({ Component, isAutorizing, authToken, ...props }) => {
  if (isAutorizing) {
    return <Spinner marginX="auto" marginY={120} />
  }
  
  if (authToken) return <Component {...props} />
  return <Redirect to='/login' />
}

export default GateKeeper