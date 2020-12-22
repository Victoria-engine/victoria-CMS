import React from 'react'
import classes from './styles.module.scss'
import Sidebar from './Sidebar'
import { LayoutProps } from '../../types'
import { ApplicationIcon, SettingsIcon, EditIcon } from 'evergreen-ui'

/**
 * Layout component
 */
const Layout: React.FC<LayoutProps> = ({ children, history, hasSidebar, blog }) => {
  return (
    <div className={classes.layoutContainer}>
      {hasSidebar && <Sidebar
        tabs={[
          { icon: EditIcon, label: 'Drafts', to: '/drafts' },
          { icon: ApplicationIcon, label: 'Posts', to: '/' },
          { icon: SettingsIcon, label: 'Settings', to: '/settings' },
        ]}
        activeItem={history.location.pathname}
        title={blog.title}
      />}

      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout