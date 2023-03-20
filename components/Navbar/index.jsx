import {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './NavbarStyles';
import Spinner from 'react-bootstrap/Spinner';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };
    const handleRouteChangeEnd = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeEnd', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeEnd', handleRouteChangeEnd);
    };
  }, []);
  
  return (
    <nav className="navbar-container">
    <Link href="/">
      Podcaster
    </Link>
    {loading && <Spinner animation="border" />}
      <style jsx>{styles}</style>
    </nav>
  );
};

export default Navbar;
