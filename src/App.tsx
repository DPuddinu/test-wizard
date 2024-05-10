import { WizardStep } from './components/WizardConfig';
import Wizard from './components/Wizard';
import WizardStep1 from './components/WizardStep1';
import WizardStep2 from './components/WizardStep2';
import { ThemeProvider } from './components/providers/theme-provider';
import { useQuery } from '@tanstack/react-query';

function getAge(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(19);
    }, 1000);
  });
}

function App() {
  
  const { data } = useQuery({
    queryFn: getAge,
    queryKey: ['age']
  });
  
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

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <main className='h-screen '>
        <Wizard steps={wizardSteps} />
      </main>
    </ThemeProvider>
  );
}

export default App;
