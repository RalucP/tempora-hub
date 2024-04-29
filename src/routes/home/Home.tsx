import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getTaskCollectionFromUser } from '../../utils/firebase';
import { setTasks } from '../../store/tasks/tasks.reducer';

import NavBar from '../../components/nav-bar/NavBar';
import TasksContainer from '../../components/tasks-container/TasksContainer';

import './Home.styles.scss'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasks = async () => {
      const tasksArray = await getTaskCollectionFromUser();
      dispatch(setTasks(tasksArray));
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