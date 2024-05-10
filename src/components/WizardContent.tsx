import { useWizard } from '@/hooks/useWizard';
import { WizardProps } from './Wizard';
import { Button } from './ui/button';

const WizardContent = ({ steps }: WizardProps) => {
  const { currentStep } = useWizard();

  return (
    <div className='rounded-lg space-y-4 p-6'>
      <header className='rounded-lg'>
        <ul className='flex gap-2'>
          {steps.map((step, i) => (
            <li key={step.key}>
              <Button variant={i === currentStep ? 'destructive' : 'default'}>
                {step.label}
              </Button>
            </li>
          ))}
        </ul>
      </header>
      <section>{steps[currentStep].component}</section>
      <footer className=''>
        <Button type='submit' form={steps[currentStep].key}>
          {currentStep === steps.length-1 ? 'Finish': 'Next'}
        </Button>
      </footer>
    </div>
  );
};

export default WizardContent;
