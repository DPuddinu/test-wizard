import { WizardContext } from '@/components/providers/WizardProvider';
import { useContext } from 'react';

export const useWizard = () => {
  const wizardContext = useContext(WizardContext);
  if (!wizardContext) {
    throw new Error('useWizard has to be used within <WizardContext.Provider>');
  }

  return wizardContext;
};
