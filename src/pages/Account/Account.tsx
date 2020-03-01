import React from 'react'
import Topbar from '../../components/Layout/Topbar'
import classes from './styles.module.scss'
import { Button, TextInput } from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'
import { Store } from '../../types'
import { transformToLocalDate } from '../../utils/dateUtils'
import { logoutUser } from '../../reducers/auth'

const Account: React.FC = () => {

  const dispatch = useDispatch()

  // Selectors
  const userData = useSelector(({ blog }: Store) => blog.user)

  const onLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className={classes.accountContainer}>
      <Topbar
        title='Account'
        actions={[
          { onClick: undefined, appearance: 'primary', label: 'Save', iconName: 'saved' }
        ]}
      />

      <div className={classes.accountSettings}>

        <div className={classes.labelsCol}>
          <span>First name</span>
          <span>Last name</span>
          <span>Email address</span>
        </div>
        <div className={classes.fieldsCols}>
          <TextInput value={userData.firstName} />
          <TextInput value={userData.lastName} />
          <TextInput value={userData.email} />
        </div>
      </div>

      <p className={classes.created}>Account created at {transformToLocalDate(userData.createdAt)}</p>


      <div className={classes.actions}>
        <Button onClick={onLogout} appearance='minimal' iconAfter='log-out'>Logout</Button>
      </div>
    </div>
  )
}

export default Account