import Link from 'next/link';
import styles from './NavbarStyles';

const Navbar = () => {
  return (
    <nav className="navbar-container">
    <Link href="/">
      Podcaster
    </Link>
      <style jsx>{styles}</style>
    </nav>
  );
};

export default Navbar;
