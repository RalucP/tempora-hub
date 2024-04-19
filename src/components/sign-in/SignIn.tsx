import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button, { BUTTON_STYLE_TYPE } from '../button/Button';
import Divider from '../divider/Divider';
import FormInput from '../form-input/FormInput';

import './SignIn.styles.scss';
import { AuthError } from 'firebase/auth';

export type SignInProps = {
  onToggleForm: () => void
}

const defaultFormValues = {
  email: '',
  password: ''
};

const signInWithGoogle = async () => {
  await signInWithGooglePopup();
}

const SingIn: FC<SignInProps> = ({ onToggleForm }) => {
  const [ formValues, setFormValues ] = useState(defaultFormValues);
  const { email, password } = formValues;

  const resetFormValues = () => {
    setFormValues(defaultFormValues);
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormValues();
    }
    catch(error) {
      if((error as AuthError).code == 'auth/invalid-credential'){
        alert('Wrong email or password');
      } 
    }
  }

  return (
    <section className={`sign-in-container form`}>
      <h1>Sign In</h1>
      <p>Sign in to see and manage your tasks</p>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='E-mail'
          type='email'
          id='sign-in-email'
          name='email'
          value={email}
          onChange={handleTextChange}
          placeholder=''
          required
        />
        <FormInput 
          label='Password'
          type='password'
          id='sign-in-password'
          name='password'
          value={password}
          onChange={handleTextChange}
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