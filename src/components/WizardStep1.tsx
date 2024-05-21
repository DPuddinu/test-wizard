import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from './ui/button';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required().optional()
  })
  .required();
type SchemaType = yup.InferType<typeof schema>;

interface Props {
  onSubmit: () => void;
}
export type Ref = HTMLFormElement;

export interface IWizardStep {
  trigger: () => void;
}

export const WizardStep1 = forwardRef<IWizardStep, Props>(({ onSubmit }, ref) => {

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      firstName: '',
      age: 12
    }
  });

  const onFormSubmit = handleSubmit((data) => {
    console.log('step 1 done', data);
    onSubmit();
  });

  useImperativeHandle(ref, () => ({
    trigger
  }));

  return (
    <form onSubmit={onFormSubmit} className='space-y-2 w-fit border rounded-lg p-2'>
      <div className='flex gap-2'>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your name?</span>
          </div>
          <input className='input input-bordered ' type='text' {...register('firstName')} />
          <div className='label'>
            <span className='label-text-alt'>{errors.firstName?.message}</span>
          </div>
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your age?</span>
          </div>
          <input
            className='input input-bordered '
            type='number'
            {...register('age', {
              valueAsNumber: true
            })}
          />
          <div className='label'>
            <span className='label-text-alt'>{errors.age?.message}</span>
          </div>
        </label>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
});
