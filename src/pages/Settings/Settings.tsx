import React from 'react'
import { PostEditProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { Code, Icon, InfoSignIcon } from 'evergreen-ui'
import { useSelector } from 'react-redux'
import classes from '../Account/styles.module.scss'


const Settings: React.FC<Props> = () => {
  const { blog } = useSelector(({ blog }: Store) => blog)
  const consumerKey = blog.key.value

  return (
    <div className={classes.root}>
      <Topbar title='API Settings' actions={[]} />

      <div className={classes.accountSettings}>

        <div className={classes.labelsCol}>
          <span>Blog public consumer key:</span>
        </div>
        <div className={classes.fieldsCols}>
          <Code style={{ color: '#e9404c' }}>{consumerKey}</Code>
        </div>
      </div>
      <p className={classes.warning}>
        <Icon icon={InfoSignIcon} color="warning" marginRight={5} paddingTop={3} />
          This key is used to identify your blog content when consuming public endpoints,
          please refer to the documentation for more information.
        </p>
    </div>
  )
}

export default Settings