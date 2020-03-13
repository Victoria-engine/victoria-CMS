import React from 'react'
import Joyride from 'react-joyride'
import { OnBorderderProps } from '../../types'

const OnBoarder: React.FC<OnBorderderProps> = ({ steps, ...props }) => {
  return (
    <Joyride 
      steps={steps}
      debug
      showProgress
      showSkipButton
      continuous
      {...props}
    />
  )
}

export default OnBoarder