import { useState } from 'react';

import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../components/sign-in/SignIn';
import './Authentication.styles.scss';

const Authentication = () => {
  const [ isSignUp, setIsSignUp ] = useState(true);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  }

  return(
    <div className='auth-container'>
      {
        isSignUp ? <SignUp onToggleForm={handleToggleForm} />: <SignIn onToggleForm={handleToggleForm} />
      }
    </div>
  )
}

export default Authentication;