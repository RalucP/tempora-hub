import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectIsDropdownOpen } from '../../store/user/user.selector';

import './User.styles.scss';
import { useEffect, useState } from 'react';
import { setIsDropdownOpen } from '../../store/user/user.reducer';

const User = () => {
  const dispatch = useDispatch();
  const [ initials, setInitials ] = useState('');

  const currentUser = useSelector(selectCurrentUser);
  const isDropdownOpen = useSelector(selectIsDropdownOpen);

  const toggleIsDropdownOpen = () => dispatch(setIsDropdownOpen(!isDropdownOpen));

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
    <div className='user-icon' onClick={toggleIsDropdownOpen}>
      {initials}
    </div>
  )
}

export default User;