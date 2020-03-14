import React from 'react'
import { PostEditProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { Code, Icon } from 'evergreen-ui'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../Account/styles.module.scss'

const Settings: React.FC<Props> = () => {

  const dispatch = useDispatch()

  // Selectors
  const blogReducer = useSelector(({ blog }: Store) => blog)
  const apiKey = blogReducer.blog.key


  return (
    <div>
      <Topbar title='Settings' actions={[]} />

      <div className={classes.accountSettings}>

        <div className={classes.labelsCol}>
          <span>Blog private API KEY: </span>
        </div>
        <div className={classes.fieldsCols}>
          <Code style={{ color: '#e9404c' }}>{apiKey}</Code>
        </div>
      </div>
      <p className={classes.warning}>
        <Icon icon="info-sign" color="warning" marginRight={5} paddingTop={3} />
          This key <b>should not be public to anyone</b> but you or your development team !
          Sharing to others might harm you blog!
        </p>
    </div>
  )
}

export default Settings