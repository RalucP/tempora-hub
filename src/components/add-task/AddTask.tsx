import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddTask.styles.scss';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

const AddTask = () => {
  return(
    <div className='add-task-container'>
      <FontAwesomeIcon className='icon' icon={faAdd} />
      <input className='add-task-input' placeholder='Add new task...' type="text" />
      <Button>Add</Button>
    </div>
  )
}

export default AddTask;