import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const PrivatePage = ({ children } : { children: ReactNode }) => {
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);

  return (
    <>
      { !currentUser ? <Navigate to='auth' /> : children }
    </>
  )
}

export default PrivatePage;