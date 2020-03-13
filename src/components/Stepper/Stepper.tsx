import React from 'react'
import { StepperProps } from '../../types'
import './stepperStyles.scss'

const Stepper: React.FC<StepperProps> = ({ steps, showNumber, onSelect, activeStep }) => {
  const lastIndexOfSteps = steps.length - 1

  return (
    <>
      <div className="stepper-container">
        {steps.map((step, index) => {
          return (
            <React.Fragment key={index}>
              <div className="stepper-item">
                <div className="stepper-item-outer" onClick={onSelect.bind(null, index + 1)}>
                  <div className={`stepper-item-inner ${activeStep === (index + 1) ? 'stepper-item-inner-active'
                    : (index + 1) < activeStep ? 'stepper-item-inner-completed' : 'stepper-item-inner-future'}`}>
                    {showNumber && index + 1} </div>
                </div>
                <span className={`stepper-title ${activeStep === (index + 1) ? 'stepper-title-active' : ''}`}> {step.title} </span>
              </div>
              {lastIndexOfSteps === index ? '' : <div className="stepper-item-outer"> </div>}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

Stepper.defaultProps = {
  steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }, { title: 'Step 4' }],
  showNumber: false,
  activeStep: 0,
}

export default Stepper