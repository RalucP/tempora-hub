import { FC } from 'react';
import { signInWithGooglePopup } from '../../utils/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button, { BUTTON_STYLE_TYPE } from '../button/Button';
import Divider from '../divider/Divider';
import FormInput from '../form-input/FormInput';

import './SignIn.styles.scss';

export type SignInProps = {
  onToggleForm: () => void
}

const signInWithGoogle = async () => {
  await signInWithGooglePopup();
}

const SingIn: FC<SignInProps> = ({ onToggleForm }) => {
  return (
    <section className={`sign-in-container form`}>
      <h1>Sign In</h1>
      <p>Sign in to see and manage your tasks</p>
      <form>
        <FormInput 
          label='E-mail'
          type='email'
          id='sign-in-email'
          placeholder=''
          required
        />
        <FormInput 
          label='Password'
          type='password'
          id='sign-in-password'
          placeholder=''
          required
        />
        <Button>Log in</Button>
      </form>
      <Divider>Or sign in with</Divider>
      <Button buttonType={BUTTON_STYLE_TYPE.secondary} onClick={signInWithGoogle}>
        <FontAwesomeIcon icon={faGoogle} />
        Google Account
      </Button>
      <div className='auth-options-container'>
        <p>Don't have an account?</p>
        <Button buttonType={BUTTON_STYLE_TYPE.tertiary} onClick={onToggleForm}>Sign up</Button>
      </div>
    </section>
  )
}

export default SingIn;