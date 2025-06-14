import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  const categoryData = category?.dataValues || category;
  
  if (!categoryData || !categoryData.id || !categoryData.title) {
    console.error('Invalid category data:', categoryData);
    return null;
  }

  const imageUrl = categoryData.image 
    ? (categoryData.image.startsWith('http') 
      ? categoryData.image 
      : `${process.env.REACT_APP_API_URL || 'http://localhost:3333'}${categoryData.image}`)
    : '/placeholder-category.jpg';

  return (
    <div className={styles.card}>
      <Link to={`/category/${categoryData.id}/products`}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={categoryData.title}
            className={styles.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-category.jpg';
            }}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{categoryData.title}</h3>
          <div className={styles.overlay}></div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;