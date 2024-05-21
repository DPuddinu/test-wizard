import { useWizard } from '@/hooks/useWizard';
import { Button } from './ui/button';

const WizardContent = () => {
  const { currentStep, steps } = useWizard();

  return (
    <div className='rounded-lg space-y-4 p-6'>
      <header className='rounded-lg'>
        <ul className='flex gap-2'>
          {steps.map((step, i) => (
            <li key={step.key}>
              <Button variant={i === currentStep ? 'destructive' : 'default'}>{step.label}</Button>
            </li>
          ))}
        </ul>
      </header>
      <section>{steps[currentStep].component}</section>
      <footer>
      </footer>
    </div>
  );
};

export default WizardContent;
