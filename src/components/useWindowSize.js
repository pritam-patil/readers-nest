import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateSize = () => {
    const innWidth = window.innerWidth;
    const innHeight = window.innerHeight;

    setWidth(innWidth);
    setHeight(innHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  });

  return {
    height,
    width,
  };
};

export default useWindowSize;
