import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import notFoundImage from '../../assets/images/404.png'; // Импортируем изображение

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <img 
          src={notFoundImage} 
          alt="404 Страница не найдена" 
          className={styles.notFoundImage}
        />
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.message}>Извините, запрашиваемая страница не существует</p>
        <Link to="/" className={styles.homeLink}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;