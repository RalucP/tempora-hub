import { useSelector } from 'react-redux';
import { selectIsDropdownOpen } from '../../store/user/user.selector';

import UserDropdown from '../user-dropdown/UserDropdown';
import User from '../user/User';

import './NavBar.styles.scss';

const NavBar = () => {
  const isDropdownOpen = useSelector(selectIsDropdownOpen);

  return(
    <nav className="nav-bar">
      <User />
      {isDropdownOpen && <UserDropdown /> }
    </nav>
  )
}

export default NavBar;