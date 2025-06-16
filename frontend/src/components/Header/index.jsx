
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as CartIcon } from '../../assets/svg/cart.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Logo className={styles.logoIcon} />
          <span>GardenShop</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Main Page</Link>
          <Link to="/catalog" className={styles.navLink}>All Products</Link>
          <Link to="/category" className={styles.navLink}>All Categories</Link>
          <Link to="/discounted" className={styles.navLink}>All Sales</Link>
        </nav>
        
        <div className={styles.actions}>
          <Link to="/cart" className={styles.cart}>
            <CartIcon />
            
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;