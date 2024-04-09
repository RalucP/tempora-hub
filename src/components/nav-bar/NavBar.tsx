import UserDropdown from '../user-dropdown/UserDropdown';
import User from '../user/User';
import './NavBar.styles.scss';

const NavBar = () => {
  return(
    <nav className="nav-bar">
      <User />
      <UserDropdown />
    </nav>
  )
}

export default NavBar;