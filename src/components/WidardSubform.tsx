import { useWizard } from '@/hooks/useWizard';
import React, { useRef, useState } from 'react';
import { IWizardStep, WizardStep1 } from './WizardStep1';
import { Button } from './ui/button';

type SubForm = {
  key: string;
  render: (props: RenderProps) => React.ReactNode;
};

type SubFormStatus = {
  [key: string]: 'valid' | 'invalid';
};

type RenderProps = {
  onSubmit: () => void;
};

const SubForm = () => {
  const { nextStep } = useWizard();
  const refs = useRef<(IWizardStep |null)[]>(Array(2)
      .fill(null)
      .map(() => React.createRef<IWizardStep>().current));

  const subFormConfig: SubForm[] = [
    {
      key: 'subform-1',
      render: ({ onSubmit }) => <WizardStep1 ref={(el) => (refs.current[0] = el)} onSubmit={onSubmit} />
    },
    {
      key: 'subform-2',
      render: ({ onSubmit }) => <WizardStep1 ref={(el) => (refs.current[1] = el)} onSubmit={onSubmit} />
    }
  ];

  const [subFormStatus, setSubFormStatus] = useState<SubFormStatus>(
    subFormConfig.reduce<SubFormStatus>((acc, { key }) => {
      acc[key] = 'invalid';
      return acc;
    }, {})
  );

  function checkStatus() {
    if (Object.values(subFormStatus).some((status) => status === 'invalid')) {
      console.log('invalid status');
      refs.current.forEach(ref => ref?.trigger())
    } else {
      nextStep();
    }
  }
  return (
    <div className='flex flex-col gap-2'>
      {subFormConfig.map((subForm) => (
        <div key={subForm.key}>
          {subForm.render({
            onSubmit: () => {
              setSubFormStatus({
                ...subFormStatus,
                [subForm.key]: 'valid'
              });
            }
          })}
        </div>
      ))}
      <Button className='max-w-[4rem]' onClick={() => checkStatus()}>
        Submit
      </Button>
    </div>
  );
};

export default SubForm;
