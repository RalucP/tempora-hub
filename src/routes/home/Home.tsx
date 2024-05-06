import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import { setTasks } from '../../store/tasks/tasks.reducer';

import NavBar from '../../components/nav-bar/NavBar';
import TasksContainer from '../../components/tasks-container/TasksContainer';

import './Home.styles.scss'

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTasks = async () => {
      dispatch(setTasks());
    }

    getTasks();
  }, [dispatch]);

  return (
    <div className="container">
      <main className='main-container'>
        <NavBar />
        <TasksContainer />
      </main>
    </div>
  )
}

export default Home;