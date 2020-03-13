import React from 'react'
import { PostEditProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { Code, Icon } from 'evergreen-ui'
import { useDispatch, useSelector } from 'react-redux'

const Settings: React.FC<Props> = () => {

  const dispatch = useDispatch()

  // Selectors
  const blogReducer = useSelector(({ blog }: Store) => blog)
  const apiKey = blogReducer.blog.key


  return (
    <div>
      <Topbar title='Settings' actions={[]} />

      <p>Blog private API KEY</p>

      <p>
          <Icon icon="info-sign" color="warning" marginRight={5} paddingTop={3} />
          This key <b>should not be public to anyone</b> but you or your development team !
          Sharing to others might harm you blog!
        </p>
      <Code style={{ color: '#e9404c' }}>{apiKey}</Code>
    </div> 
  )
}

export default Settings