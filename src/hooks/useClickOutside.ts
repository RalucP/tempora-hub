import { useEffect, useRef } from "react";

const useClickOutside = (callback: (event: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      callback(event);
    }

    document.addEventListener('pointerdown', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handleClick);
    }
  }, [callback]);

  return ref;
}

export default useClickOutside;