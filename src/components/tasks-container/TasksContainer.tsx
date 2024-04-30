import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/tasks/tasks.selector';

import AddTask from '../add-task/AddTask';
import Task from '../task/Task';

import './TasksContainer.styles.scss';

const TasksContainer = () => {
  const tasksArray = useSelector(selectTasks);

  return(
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

export default TasksContainer;