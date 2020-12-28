import React from 'react'
import classes from './styles.module.scss'
import { SidebarProps as Props } from '../../types'
import { Icon } from 'evergreen-ui'
import { NavLink } from 'react-router-dom'


const Sidebar: React.FC<Props> = ({ tabs }) => {
  return (
    <div className={classes.sidebar}>
      <ul>
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
                <Icon icon={tab.icon} color='muted' marginRight={16} />
                <p>{tab.label}</p>
              </li>
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}
export default Sidebar