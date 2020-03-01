import { Store } from "../../../types"
import { connect } from "react-redux"
import GateKeeper from "./Gatekeeper"
import { RouteProps } from "react-router-dom"

export default (Component: RouteProps['component']) => {
  const mapStateToProps = ({ auth }: Store) => ({
    authToken: auth.authToken,
    isAutorizing: auth.working,
    Component,
  })

  return connect(mapStateToProps)(GateKeeper as any)
}