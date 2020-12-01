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
          <span>Blog public consumer key:</span>
        </div>
        <div className={classes.fieldsCols}>
          <Code style={{ color: '#e9404c' }}>{apiKey}</Code>
        </div>
      </div>
      <p className={classes.warning}>
        <Icon icon="info-sign" color="warning" marginRight={5} paddingTop={3} />
          This key is used to identify your blog content when consuming public endpoints,
          please refer to the documentation for more information.
        </p>
    </div>
  )
}

export default Settings