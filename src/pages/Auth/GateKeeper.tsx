import React, { ComponentType } from 'react'
import { Store } from "../../types"
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'



/**
 * Simple Wrapper for route components with an auth layer
 */
const GateKeeper: React.FC = ({ children }) => {

  const history = useHistory()

  const authToken = useSelector(({ auth }: Store) => auth.authToken)

  if (!authToken) history.push('/login')

  return (
    <>
      {children}
    </>
  )
}


export default (children: ComponentType) => {
  return GateKeeper
}