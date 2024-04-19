import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

import './User.styles.scss';
import { useEffect, useState } from 'react';

const User = () => {
  const [ initials, setInitials ] = useState('');

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if(!currentUser) return;
    const { displayName, email } = currentUser;

    if(!displayName) {
      setInitials(email.substring(0,1).toLocaleUpperCase());
    }
    else{
      setInitials(displayName.substring(0, 1).toLocaleUpperCase());
    }
  }, [currentUser]);

  return (
    <div className='user-icon'>
      {initials}
    </div>
  )
}

export default User;