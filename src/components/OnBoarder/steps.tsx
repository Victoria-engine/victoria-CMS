import React from 'react'
import { OnBorderderProps, GetStepsProps } from "../../types"

export const getPostsSteps = ({ show }: GetStepsProps) => {
  if (show) {
    const steps: OnBorderderProps['steps'] = [
      { content: 'Welcoem ma dude!', target: '#posts-table', title: 'Hello', disableBeacon: true },
    ]

    return steps
  }

  return []
}