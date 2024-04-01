import { FC, InputHTMLAttributes } from 'react';
import './FormInput.styles.scss';

export type FormInputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({label, id, ...otherProps}) => {
  return(
    <div className='form-input-container'>
      <input {...otherProps} id={id} className='form-input'/>
      {
        label && <label htmlFor={id} className='form-input-label'>{label}</label>
      }
    </div>
  )
}

export default FormInput;