import { signOutUser } from '../../utils/firebase';
import './UserDropdown.style.scss';

const UserDropdown = () => {

  const handleSignOut = async () => {
    await signOutUser();
  }

  return (
    <ul className='user-dropdown-container'>
      <li onClick={handleSignOut} className='user-dropdown-element'>Sign out</li>
    </ul>
  )
}

export default UserDropdown;