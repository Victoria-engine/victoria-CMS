import React from 'react'
import { GatekeeperProps } from '../../../types'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'evergreen-ui'

const GateKeeper: React.FC<GatekeeperProps> = ({ Component, isAutorizing, authToken, ...props }) => {
  
  if (authToken && !isAutorizing) return <Component {...props}/>
  if (!isAutorizing) return <Redirect to='/login'/>

  return <Spinner />
}

export default GateKeeper