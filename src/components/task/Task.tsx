import { FC, InputHTMLAttributes, LabelHTMLAttributes, useState } from 'react'
import './Task.styles.scss'

export type TaskProps =  InputHTMLAttributes<HTMLInputElement> 
& LabelHTMLAttributes<HTMLLabelElement>

const Task: FC<TaskProps> = ({ id, children, ...otherProps }) => {
  const [ status, setStatus ] = useState(true);

  const onCheckboxChange = () => {
    setStatus(!status);
  }

  return (
    <div className='task-container'>
      <input 
        type="checkbox" 
        className='task-checkbox' 
        id={id} onChange={onCheckboxChange} 
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