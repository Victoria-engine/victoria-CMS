import React from 'react'
import classes from './styles.module.scss'
import Sidebar from './Sidebar'
import { LayoutProps } from '../../types'

/**
 * Layout component
 */
const Layout: React.FC<LayoutProps> = ({ children, history, hasSidebar }) => {
  return (
    <div className={classes.layoutContainer}>
      {hasSidebar && <Sidebar
        tabs={[
          { iconName: 'edit', label: 'Create new post', to: '/new' },
          { iconName: 'applications', label: 'Posts', to: '/posts' },
          { iconName: 'settings', label: 'Settings', to: '/settings' },
        ]}
        activeItem={history.location.pathname}
      />}

      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout