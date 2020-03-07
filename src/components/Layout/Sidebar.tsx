import React from 'react'

import classes from './styles.module.scss'
import { SidebarProps } from '../../types'
import { Icon } from 'evergreen-ui'
import { NavLink, Link } from 'react-router-dom'
import logoImage from '../../assets/logo.png'

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeItem }) => {
  return (
    <div className={classes.sidebar}>
      <ul>
        
        <Link to='/'>
          <img src={logoImage} alt='victoria logo' className={classes.logo}>
          </img>
        </Link>
        <p>BLOG NAME</p>

        {tabs.map(tab => {
          return (
            <NavLink
              key={tab.to}
              to={tab.to as string}
              className={classes.item}
              activeClassName={classes.activeSidebarItem}
              exact
            >
            <li>
              <Icon icon={tab.iconName} color='muted' marginRight={16} />
              <p>{tab.label}</p>
          </li>
          </NavLink>
        )})}

          <NavLink to='/account' activeClassName={classes.activeSidebarItem}>
            <li>
              <Icon icon='user' color='muted' marginRight={16} />
              <p>Account</p>
          </li>
          </NavLink>
      </ul>
    </div>
  )
}
export default Sidebar