import { useQuery } from '@tanstack/react-query';
import { WizardStep } from './components/WizardConfig';
import WizardContent from './components/WizardContent';
import WizardStep1 from './components/WizardStep1';
import WizardStep2 from './components/WizardStep2';
import { Wizard } from './components/providers/WizardProvider';
import { ThemeProvider } from './components/providers/theme-provider';

function getAge(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(19);
    }, 1000);
  });
}

function App() {
  // simulo una chiamata per settare dopo i valori nel form
  const { data } = useQuery({
    queryFn: getAge,
    queryKey: ['age']
  });

  // questi possono anche andare in un file a parte se vogliamo
  const wizardSteps: WizardStep[] = [
    {
      key: 'step-1',
      label: 'Step 1',
      component: <WizardStep1 age={data} />
    },
    {
      key: 'step-2',
      label: 'Step 2',
      component: <WizardStep2 />
    }
  ];

  function onSubmit() {
    // questa può essere per esempio la chiusura di una modale o una chiamata POST o altro
    console.log('submit');
  }
  function onCancel() {
    // chiudi dialog o annulla draft o altro
    console.log('cancel');
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <main className='h-screen '>
        <Wizard onSubmit={onSubmit} onCancel={onCancel} steps={wizardSteps}>
          <WizardContent />
        </Wizard>
        <Wizard onSubmit={onSubmit} onCancel={onCancel} steps={wizardSteps}>
          <WizardContent />
        </Wizard>
      </main>
    </ThemeProvider>
  );
}

export default App;
