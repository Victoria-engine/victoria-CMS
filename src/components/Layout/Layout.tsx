import React from 'react'
import classes from './styles.module.scss'
import Sidebar from './Sidebar'
import { LayoutProps } from '../../types'

/**
 * Layout component
 */
const Layout: React.FC<LayoutProps> = ({ children, history, hasSidebar, blog }) => {
  return (
    <div className={classes.layoutContainer}>
      {hasSidebar && <Sidebar
        tabs={[
          { iconName: 'edit', label: 'Drafts', to: '/drafts' },
          { iconName: 'applications', label: 'Posts', to: '/' },
          { iconName: 'settings', label: 'Settings', to: '/settings' },
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