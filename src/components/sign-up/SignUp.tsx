import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { BUTTON_STYLE_TYPE } from '../button/Button';
import Divider from '../divider/Divider';
import FormInput from '../form-input/FormInput';

import './SignUp.styles.scss'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FC } from 'react';

export type SignUpProps = {
  onToggleForm: () => void
}

const SignUp: FC<SignUpProps> = ({ onToggleForm }) => {
  return(
    <section className={`sign-up-container form`}>
      <h1>Sign Up</h1>
      <p>Sign up to start managing your tasks</p>
      <form>
        <FormInput 
          label='Full name'
          type='text'
          placeholder=' '
          required
        />
        <FormInput 
          label='E-mail'
          type='email'
          placeholder=' '
          required
        />
        <FormInput 
          label='Password'
          type='password'
          placeholder=' '
          required
        />
        <FormInput 
          label='Confirm password'
          type='password'
          placeholder=' '
          required
        />
        <Button>Sign up</Button>
      </form>
      <Divider>Or sign up with</Divider>
      <Button buttonType={BUTTON_STYLE_TYPE.secondary}>
        <FontAwesomeIcon icon={faGoogle}/>
        Google Account
      </Button>
      <div className='auth-options-container'>
        <p>Already have an account?</p>
        <Button buttonType={BUTTON_STYLE_TYPE.tertiary} onClick={onToggleForm}>Sign in</Button>
      </div>
    </section>
  )
}

export default SignUp;