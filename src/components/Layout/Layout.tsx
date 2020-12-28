import React from 'react'
import classes from './styles.module.scss'
import Sidebar from './Sidebar'
import { LayoutProps as Props } from '../../types'
import { ApplicationIcon, EditIcon } from 'evergreen-ui'
import AccountBar from './AccountBar'


const Layout: React.FC<Props> = ({
  children,
  showSidebar,
  blog,
  user,
  showTopBar
}) => {

  return (
    <div className={classes.layoutContainer}>
      {showTopBar && <AccountBar user={user} blog={blog} />}

      <div className={classes.contentWrapper}>
        {showSidebar &&
          <Sidebar
            tabs={[
              { icon: ApplicationIcon, label: 'Posts', to: '/' },
              { icon: EditIcon, label: 'Drafts', to: '/drafts' },
            ]}
          />}

        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout