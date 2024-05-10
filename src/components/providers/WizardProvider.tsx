import { PropsWithChildren, createContext, useState } from 'react';
import { WizardStep } from '../WizardConfig';

type WizardState = {
  steps: WizardStep[];
  currentStep: number;
  currentStepKey: string;
  onSubmit: () => void;
  onCancel: () => void;
  nextStep: () => void;
  previousStep: () => void;
};

export const WizardContext = createContext<WizardState | null>(null);

export type WizardContextProviderProps = PropsWithChildren & WizardState;
export const WizardContextProvider = ({
  children,
  onSubmit,
  onCancel,
  steps
}: Omit<WizardContextProviderProps, 'currentStep' | 'previousStep' | 'nextStep' | 'currentStepKey'>) => {
  const [currentStep, setCurrentStep] = useState(0);

  function nextStep() {
    if (currentStep < steps.length) setCurrentStep((current) => current + 1);
  }
  function previousStep() {
    if (currentStep > 0) setCurrentStep((current) => current - 1);
  }

  return (
    <WizardContext.Provider
      value={{
        currentStep: currentStep,
        currentStepKey: steps[currentStep].key,
        steps,
        onSubmit,
        onCancel,
        nextStep,
        previousStep
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
