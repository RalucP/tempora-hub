import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { BUTTON_STYLE_TYPE } from '../button/Button';
import Divider from '../divider/Divider';
import FormInput from '../form-input/FormInput';

import './SignUp.styles.scss'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  return(
    <section className='sign-up-container'>
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
        Sign up with Google
      </Button>
    </section>
  )
}

export default SignUp;