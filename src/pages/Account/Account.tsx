import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Layout/Topbar'
import classes from './styles.module.scss'
import { Button, Icon, TextInput } from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'
import { Store } from '../../types'
import { transformToLocalDate } from '../../utils/dateUtils'
import { deleteAccount, logoutUser } from '../../reducers/auth'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'
import { getUserData } from '../../reducers/blog'

const Account: React.FC = () => {
  const dispatch = useDispatch()

  const userData = useSelector(({ blog }: Store) => blog.user)
  const { accountDeleted } = useSelector(({ auth }: Store) => auth)

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [confirmedUserName, setConfirmUserName] = useState('')


  useEffect(() => {
    if (!userData.email || !userData.name) {
      dispatch(getUserData())
    }
  }, [dispatch, getUserData, userData])

  useEffect(() => {
    if (accountDeleted) {
      dispatch(logoutUser())
    }
  }, [accountDeleted, dispatch, logoutUser])


  const onLogout = () => {
    dispatch(logoutUser())
  }

  const handleDeleteAccount = () => {
    setDeleteConfirmOpen(true)
  }

  const onUserNameConfirm = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setConfirmUserName(value)
  }

  const handleConfirmDeleteAccount = () => {
    dispatch(deleteAccount())
  }

  const isUserNameConfirmValid = userData.name === confirmedUserName

  return (
    <div className={classes.accountContainer}>
      <Topbar
        title='Account'
        actions={[
          { onClick: undefined, appearance: 'primary', label: 'Save', iconName: 'saved', isDisabled: true }
        ]}
      />

      <div className={classes.accountSettings}>

        <div className={classes.labelsCol}>
          <span>Name</span>
          <span>Email address</span>
        </div>
        <div className={classes.fieldsCols}>
          <TextInput value={userData.name} />
          <TextInput value={userData.email} />
        </div>
      </div>

      <p className={classes.created}>Account created at {transformToLocalDate(userData.created_at)}</p>


      <div className={classes.actions}>
        <Button onClick={onLogout} appearance='minimal' iconAfter='log-out'>Logout</Button>
      </div>

      <div className={classes.actions}>
        <Button
          intent='danger'
          onClick={handleDeleteAccount}
          appearance='primary'
          iconAfter='delete'
        >
          Delete account
        </Button>

        <ConfirmDeleteModal
          open={deleteConfirmOpen}
          confirmText='Delete'
          title={'Are you sure you want to delete your account ?'}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDeleteAccount}
          confirmDisabled={!isUserNameConfirmValid}
        >
          <div>
            <p>This action is irreversible, are you sure you want to delete your account ?</p>
            <b>
              <Icon icon="delete" color="red" marginRight={5} paddingTop={3} />
              Deleting your account will delete all your content and make any other blog posts consuming your content
              not valid.
            </b>

            <p>In order to delete your account, please type bellow your user name:</p>
            <TextInput
              isInvalid={!isUserNameConfirmValid}
              label='User name'
              value={confirmedUserName}
              onChange={onUserNameConfirm}
            />
          </div>
        </ConfirmDeleteModal>
      </div>
    </div>
  )
}

export default Account