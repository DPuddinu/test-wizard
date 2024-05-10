import { useWizard } from '@/hooks/useWizard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    lastName: yup.string().required(),
    address: yup.string().required()
  })
  .required();
type SchemaType = yup.InferType<typeof schema>;

export default function WizardStep2() {
  const { onSubmit, currentStepKey } = useWizard();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(schema)
  });

  const onFormSubmit = handleSubmit((data) => {
    console.log('step 2 done', data);
    onSubmit();
  });

  return (
    <form id={currentStepKey} onSubmit={onFormSubmit} className='space-y-2'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text'>What is your last name?</span>
        </div>
        <input className='input input-bordered ' type='text' {...register('lastName')} />
        <div className='label'>
          <span className='label-text-alt'>{errors.lastName?.message}</span>
        </div>
      </label>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text'>What is your address?</span>
        </div>
        <input className='input input-bordered ' type='string' {...register('address')} />
        <div className='label'>
          <span className='label-text-alt'>{errors.address?.message}</span>
        </div>
      </label>
    </form>
  );
}
