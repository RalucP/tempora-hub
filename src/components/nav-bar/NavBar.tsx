import { useDispatch, useSelector } from 'react-redux';
import { selectIsDropdownOpen } from '../../store/user/user.selector';

import UserDropdown from '../user-dropdown/UserDropdown';
import User from '../user/User';

import './NavBar.styles.scss';
import { setIsDropdownOpen } from '../../store/user/user.reducer';
import useClickOutside from '../../hooks/useClickOutside';

const NavBar = () => {
  const isDropdownOpen = useSelector(selectIsDropdownOpen);
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      if(isDropdownOpen) {
        dispatch(setIsDropdownOpen(false));
      }
    }
  }

  const ref = useClickOutside(handleClickOutside);


  return(
    <nav className="nav-bar">
      <div ref={ref}>
        <User />
        {isDropdownOpen && <UserDropdown /> }
      </div>
    </nav>
  )
}

export default NavBar;