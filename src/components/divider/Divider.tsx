import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './Divider.styles.scss';

const Divider: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children }) => {
  return(
    <div className='divider-container'>
      <span className='line' />
      {children}
      <span className='line' />
    </div>
  )
}

export default Divider;