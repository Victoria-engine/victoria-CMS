import React, { useState } from 'react'
import Stepper from '../../components/Stepper'

const Tutorial: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1)
  
  const onChangeStep = (value: number) => {
    setActiveStep(value)
  }

  return (
    <div>
      <Stepper 
        activeStep={activeStep}
        onSelect={onChangeStep}
        steps={[{ title: 'Create your very first blog' }, { title: 'Setup the template' }, { title: 'Deploy blog' }]}
      />
    </div>
  )
}

export default Tutorial