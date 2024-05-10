import { WizardStep } from './WizardConfig';
import WizardContent from './WizardContent';
import { WizardContextProvider } from './providers/WizardProvider';

export type WizardProps = {
  steps: WizardStep[];
};
const Wizard = ({ steps }: WizardProps) => {
  function onSubmit() {
    console.log('wizard submit');
  }
  function onCancel() {
    console.log('wizard cancel');
  }

  return (
    <WizardContextProvider onSubmit={onSubmit} onCancel={onCancel} steps={steps}>
      <WizardContent steps={steps} />
    </WizardContextProvider>
  );
};

export default Wizard;
