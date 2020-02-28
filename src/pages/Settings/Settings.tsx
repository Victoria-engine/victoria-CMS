import React from 'react'
import { PostEditProps as Props } from '../../types'
import Topbar from '../../components/Layout/Topbar'

const Settings: React.FC<Props> = () => {

  return (
    <div>
      <Topbar title='Settings' actions={[]} />
    </div> 
  )
}

export default Settings