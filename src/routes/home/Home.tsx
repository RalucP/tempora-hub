import NavBar from '../../components/nav-bar/NavBar';
import TasksContainer from '../../components/tasks-container/TasksContainer';

import './Home.styles.scss'

const Home = () => {
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