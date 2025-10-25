import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // tracks current route

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top whenever route changes
  }, [pathname]); // dependency triggers effect on route change

  return null; // no UI
};

export default ScrollToTop;
