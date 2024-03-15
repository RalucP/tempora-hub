import { FC, InputHTMLAttributes } from 'react';
import './FormInput.styles.scss';

export type FormInputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {
  return(
    <div className='form-input-container'>
      <input {...otherProps} className='form-input'/>
      {
        label && <label className='form-input-label'>{label}</label>
      }
    </div>
  )
}

export default FormInput;