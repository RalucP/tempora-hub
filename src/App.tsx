import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.scss'
import Authentication from './routes/authentication/Authentication'
import Home from './routes/home/Home'
import PrivatePage from './components/private-page/PrivatePage'
import { useEffect } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './store/user/user.reducer'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) createUserDocumentFromAuth(user);

      const currentUser = user && (({displayName, email}) => ({displayName, email}))(user);

      dispatch(setCurrentUser(currentUser));
      navigate('/');
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Routes>
      <Route path='auth' element={<Authentication />} />
      <Route path='/' element={<PrivatePage>
        <Home />
      </PrivatePage>} />
    </Routes>
  )
}

export default App
