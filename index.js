import React, { useState, useEffect, Fragment } from 'react';

const WizardParent = (props) => {
  const [steps, updateSteps] = useState([])
  const [currentstep, setStep] = useState(props.currentstep || 0) 
  let { next, back, showBackButton } = Navigator({
    stepsCount: steps.length, 
    currentstep, 
    setStep, 
    onBeforeNext: props.onBeforeNext,
    onBeforeBack: props.onBeforeBack,
    handleBackButtonDisplay: props.handleBackButtonDisplay
    });

  return <Fragment>{
    React.Children.toArray(props.children).map(item => React.cloneElement(item, {
      steps,
      updateSteps,
      next,
      back,
      currentstep,
      showBackButton
    }))
  }</Fragment>
}

export const Wizard = ({updateSteps,currentstep, children}) => {
  const [steps] = useState(React.Children.toArray(children));
  useEffect(() => {
    updateSteps(steps)
  },[steps])

  return React.cloneElement(steps[currentstep], {
    currentstep: currentstep
  });
}

export const NavBar = (props) => {
  let [ NavButtons ] = useState(React.Children.toArray(props.children));
  NavButtons = NavButtons.map(item => React.cloneElement(item,{
    currentstep: props.currentstep,
    next: props.next,
    back: props.back,
    showBackButton: props.showBackButton
  }))
   return NavButtons
}

export const BackButton = (props) => {
  return props.showBackButton() && React.Children.map(props.children, child => React.cloneElement(child , {
    currentstep: props.currentstep,
    onClick: props.back,
  }));
}

export const NextButton = (props) => {
  return React.Children.map(props.children, child => React.cloneElement(child , {
    currentstep: props.currentstep,
    onClick: props.next,
  }));
}

function Navigator({stepsCount, currentstep, setStep, onBeforeNext, onBeforeBack, handleBackButtonDisplay}) {

  const next = () => {
    let navigate = onBeforeNext ? onBeforeNext() : true
    if(navigate && stepsCount-1 > currentstep) {
      setStep(currentstep += 1)
    }
  }

  const back = () => {
    let navigate = onBeforeBack ? onBeforeBack() : true
    if(navigate && currentstep > 0) {
      setStep(currentstep -= 1)
    }
  }

  const showBackButton = () => {
    return handleBackButtonDisplay ? currentstep !== 0 : true
  }

  return {
    next,
    back,
    showBackButton
  }

}

module.exports.WizardParent = WizardParent;

