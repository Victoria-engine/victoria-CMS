import React from 'react'

import classes from './styles.module.scss'
import { TopbarProps as Props } from '../../types'
import { Button} from 'evergreen-ui'

const Topbar: React.FC<Props> = ({ actions, title, description }) => {
  return (
    <div className={classes.topbar}>
      <div className={classes.titleDivider}>
        <h2>{title}</h2>
        <p className={classes.description}>{description}</p>
      </div>

      <ul>
        {Array.isArray(actions) && actions.map((tab, index) => (
          <li key={`${index}-topbarItem`}>
            <Button
              style={tab.style}
              iconAfter={tab.icon}
              disabled={tab.isDisabled}
              isLoading={tab.isLoading}
              appearance={tab.appearance}
              intent={tab.intent}
              onClick={tab.onClick}
            >
              {tab.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Topbar