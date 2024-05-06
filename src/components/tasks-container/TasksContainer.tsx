import { useSelector } from 'react-redux';
import { selectIsLoading, selectTasks } from '../../store/tasks/tasks.selector';

import AddTask from '../add-task/AddTask';
import Task from '../task/Task';

import './TasksContainer.styles.scss';
import Spinner from '../spinner/Spinner';

const TasksContainer = () => {
  const tasksArray = useSelector(selectTasks);
  const isLoading = useSelector(selectIsLoading);

  return(
    <>
      {
        isLoading ? (<Spinner />) : (
          <div className='tasks-container'>
            <AddTask />
            {
              tasksArray.map((task) => {
                return(
                  <Task 
                    key={task.id}
                    id={task.id}
                    name={task.id}
                    checked={task.status}
                  >{task.content}</Task> 
                )
              })
            }
          </div>
        )
      }
    </>
  )
}

export default TasksContainer;