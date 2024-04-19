import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { BUTTON_STYLE_TYPE } from '../button/Button';
import Divider from '../divider/Divider';
import FormInput from '../form-input/FormInput';

import './SignUp.styles.scss'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthError } from 'firebase/auth';

export type SignUpProps = {
  onToggleForm: () => void
}

const defaultFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const signInWithGoogle = async () => {
  await signInWithGooglePopup();
}

const SignUp: FC<SignUpProps> = ({ onToggleForm }) => {
  const [ formValues, setFormValues ] = useState(defaultFormValues);
  const { displayName, email, password, confirmPassword } = formValues;

  const resetFormValues = () => {
    setFormValues(defaultFormValues);
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('Passwords do not match!!');
      return;
    }

    try{
      console.log(email, password);
      const response = await createUserAuthWithEmailAndPassword(email, password);

      if(!response || !response.user) return;


      const { user } = response;

      await createUserDocumentFromAuth(user, { displayName });
      resetFormValues();
    }
    catch(error) {
      if((error as AuthError).code === 'auth/email-already-in-use'){
        alert('Cannot create user. E-mail already in use.')
      }
    }
  }

  return(
    <section className={`sign-up-container form`}>
      <h1>Sign Up</h1>
      <p>Sign up to start managing your tasks</p>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Full name'
          type='text'
          name='displayName'
          id='sign-up-full-name'
          onChange={handleTextChange}
          value={displayName}
          placeholder=' '
          required
        />
        <FormInput 
          label='E-mail'
          type='email'
          name='email'
          id='sign-up-email'
          onChange={handleTextChange}
          value={email}
          placeholder=' '
          required
        />
        <FormInput 
          label='Password'
          type='password'
          name='password'
          id='sign-up-password'
          onChange={handleTextChange}
          value={password}
          placeholder=' '
          required
        />
        <FormInput 
          label='Confirm password'
          type='password'
          name='confirmPassword'
          id='sign-up-confirm-password'
          onChange={handleTextChange}
          value={confirmPassword}
          placeholder=' '
          required
        />
        <Button>Sign up</Button>
      </form>
      <Divider>Or sign up with</Divider>
      <Button buttonType={BUTTON_STYLE_TYPE.secondary} onClick={signInWithGoogle}>
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