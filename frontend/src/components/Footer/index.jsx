import React from 'react';
import styles from './Footer.module.css';
import instagramIcon from '../../assets/svg/instagram.svg'; 
import whatsappIcon from '../../assets/svg/whatsapp.svg';
import MapImage from '../../assets/images/map.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.footerTitle}>Контакты</h2>
      
      <div className={styles.contactsContainer}>
        <div className={styles.leftSide}>
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Телефон</h3>
            <p className={styles.blockContent}>+7 (499) 350-66-04</p>
          </div>
          
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Адрес</h3>
            <p className={styles.blockContent}>Дубинская улица, Москва, Россия</p>
          </div>
        </div>
        
        <div className={styles.rightSide}>
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Социальные сети</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialLink}>
                <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink}>
                <img src={whatsappIcon} alt="WhatsApp" className={styles.socialIcon} />
              </a>
            </div>
          </div>
          
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Рабочие часы</h3>
            <p className={styles.blockContent}>24 часа в сутки</p>
          </div>
        </div>
      </div>
      
      <div className={styles.mapContainer}>
        <img src={MapImage} alt="Карта расположения" className={styles.mapImage} />
      </div>
      
      <p className={styles.copyright}>© 2024 Garden Shop. Все права защищены.</p>
    </footer>
  );
};

export default Footer;