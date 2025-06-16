import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import notFoundImage from '../../assets/images/404.png';

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <img 
          src={notFoundImage} 
          alt="404 Страница не найдена" 
          className={styles.notFoundImage}
        />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.message}>Sorry, the requested page does not exist</p>
        <Link to="/" className={styles.homeLink}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;