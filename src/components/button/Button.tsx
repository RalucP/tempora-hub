import { ButtonHTMLAttributes, FC, useState } from 'react'

import './Button.styles.scss'

export enum BUTTON_STYLE_TYPE {
  primary = 'primary',
  secondary = 'secondary'
}

export type ButtonProps = {
  buttonType?: BUTTON_STYLE_TYPE;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonType = (buttonType = BUTTON_STYLE_TYPE.primary) => {
  switch(buttonType){
    case BUTTON_STYLE_TYPE.secondary:
      return BUTTON_STYLE_TYPE.secondary
    default:
      return BUTTON_STYLE_TYPE.primary
  }
}

const useMaterializationEffect = () => {
  const [showCircle, setShowCircle] = useState(false);
  const [circleCoordinates, setCircleCoordinates] = useState({ x: 0, y: 0 });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    setShowCircle(true);
    setCircleCoordinates({ x, y });

    setTimeout(() => {
      setShowCircle(false);
      setCircleCoordinates({ x: 0, y: 0 });
    }, 500);
  };

  return { showCircle, circleCoordinates, handleButtonClick };
};


const Button: FC<ButtonProps> = ({ buttonType, children, ...otherProps }) => {
  const { showCircle, circleCoordinates, handleButtonClick } = useMaterializationEffect();

  return (
    <button onClick={handleButtonClick} className={`button ${getButtonType(buttonType)}`} {...otherProps}>
      {showCircle && <div className="circle" style={{left: circleCoordinates.x, top: circleCoordinates.y}} />}
      {children}
    </button>
  )
}

export default Button;