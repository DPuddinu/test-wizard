import { useWizard } from '@/hooks/useWizard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required().optional()
  })
  .required();
type SchemaType = yup.InferType<typeof schema>;

type Props = {
  age: number | undefined
}

export default function WizardStep1({age}: Props) {
  const { nextStep, currentStepKey } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      firstName: '',
      age: age
    }
  });

  const onFormSubmit = handleSubmit((data) => {
    console.log('step 1 done', data);
    nextStep();
  });

  return (
    <form id={currentStepKey} onSubmit={onFormSubmit} className='space-y-2'>
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
    </form>
  );
}
