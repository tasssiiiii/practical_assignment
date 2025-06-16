import React from 'react';
import styles from './Footer.module.css';
import instagramIcon from '../../assets/svg/instagram.svg'; 
import whatsappIcon from '../../assets/svg/whatsapp.svg';
import MapImage from '../../assets/images/map.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.footerTitle}>Contacts</h2>
      
      <div className={styles.contactsContainer}>
        <div className={styles.leftSide}>
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Phone</h3>
            <p className={styles.blockContent}>+7 (499) 350-66-04</p>
          </div>
          
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Addres</h3>
            <p className={styles.blockContent}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
          </div>
        </div>
        
        <div className={styles.rightSide}>
          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Socials</h3>
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
            <h3 className={styles.blockTitle}>Working Hours</h3>
            <p className={styles.blockContent}>24 hours a day</p>
          </div>
        </div>
      </div>
      
      <div className={styles.mapContainer}>
        <img src={MapImage} alt="Карта расположения" className={styles.mapImage} />
      </div>
      
    
    </footer>
  );
};

export default Footer;