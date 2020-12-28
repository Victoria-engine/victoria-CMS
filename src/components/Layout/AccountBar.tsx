import React, { useState } from 'react'
import classes from './styles.module.scss'
import { AccountBarProps as Props } from '../../types'
import {
  ApplicationIcon, Avatar, DocumentIcon, Icon, LogOutIcon, Menu, NotificationsIcon, Paragraph, PersonIcon, Popover, Position,
  SideSheet,
  toaster
} from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../reducers/auth'
import { Link, useHistory } from 'react-router-dom'
import logoImage from '../../assets/logo.png'


const Topbar: React.FC<Props> = ({ user, blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [notificationsOpen, setNotifications] = useState(false)

  const handleLogout = (close: () => void) => () => {
    toaster.success('Logged out successfully!')
    dispatch(logoutUser())
    close()
  }
  const handleSettingsClick = (close: () => void) => () => {
    history.push('/settings')
    close()
  }
  const handleAccountClick = (close: () => void) => () => {
    history.push('/account')
    close()
  }
  const handleDocsClick = (close: () => void) => () => {
    toaster.notify('Comming soon...')
    close()
  }

  return (
    <div className={classes.accountTopBar}>
      <div>
        <Link to='/' className={classes.logoHeader}>
          <img src={logoImage} alt='victoria logo' className={classes.logo}></img>
          <h3 className={classes.blogTitle}>{blog.title}</h3>
        </Link>
      </div>

      <div>
        {/* <SearchInput /> */}
      </div>

      <div className={classes.account}>
        <Icon icon={NotificationsIcon} size={23} color='grey' onClick={() => setNotifications(true)} />
        <Popover
          position={Position.BOTTOM_LEFT}
          shouldCloseOnExternalClick
          content={({ close }) =>
            <Menu>
              <Menu.Group>
                <Menu.Item icon={DocumentIcon} onSelect={handleDocsClick(close)} disabled>Documentation</Menu.Item>
                <Menu.Item icon={ApplicationIcon} onSelect={handleSettingsClick(close)}>API Settings</Menu.Item>
                <Menu.Item icon={PersonIcon} onSelect={handleAccountClick(close)}>Account</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item icon={LogOutIcon} onSelect={handleLogout(close)} intent='danger'>Sign out</Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <div className={classes.avatar}>
            <Avatar
              isSolid
              name={user.name}
              size={35}
              color='red'
            />
          </div>
        </Popover>
      </div>

      <SideSheet
        isShown={notificationsOpen}
        onCloseComplete={() => setNotifications(false)}
      >
        <div>
          <h3 style={{ marginLeft: 20 }}>Notifications</h3>
          <Paragraph margin={40}>You got no notifications</Paragraph>
        </div>
      </SideSheet>
    </div>
  )
}

export default Topbar