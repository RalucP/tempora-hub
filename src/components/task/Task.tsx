import { FC, InputHTMLAttributes, LabelHTMLAttributes, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateTaskStatus } from '../../store/tasks/tasks.reducer';

import './Task.styles.scss'

export type TaskProps = InputHTMLAttributes<HTMLInputElement> 
& LabelHTMLAttributes<HTMLLabelElement>

const Task: FC<TaskProps> = ({ id, children, checked, ...otherProps }) => {
  const [ status, setStatus ] = useState(checked);
  const dispatch = useAppDispatch();

  const onCheckboxChange = async () => {
    if(!id || !children) return;

    const newStatus = !status;
    setStatus(newStatus);

    const payload = {
      id,
      status: newStatus
    }

    dispatch(updateTaskStatus(payload));
  }

  return (
    <div className='task-container'>
      <input 
        type="checkbox" 
        className='task-checkbox' 
        id={id} 
        onChange={onCheckboxChange} 
        checked={status}
        {...otherProps} 
      />
      <label htmlFor={id} className='task-label'>
        {children}
      </label>
    </div>
  )
}

export default Task;