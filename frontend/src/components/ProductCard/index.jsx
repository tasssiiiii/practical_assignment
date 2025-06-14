import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const productData = product?.dataValues || product;
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333'; // Добавьте в .env

  if (!productData) {
    console.error('Product data is missing');
    return null;
  }

  console.log('Rendering product:', productData); // Отладочная информация

  return (
    <div className={styles.card}>
      <Link to={`/product/${productData.id}`}>
        <div className={styles.imageContainer}>
          <img 
            src={productData.image ? `${BASE_URL}${productData.image}` : '/placeholder-product.jpg'}
            alt={productData.title || 'Product image'}
            className={styles.image}
            onError={(e) => {
              console.error('Image load error:', e.target.src);
              e.target.onerror = null;
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          {productData.discont_price && (
            <span className={styles.discountBadge}>
              {Math.round((1 - productData.discont_price / productData.price) * 100)}%
            </span>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{productData.title}</h3>
          <div className={styles.priceContainer}>
            {productData.discont_price ? (
              <>
                <span className={styles.oldPrice}>{productData.price} $</span>
                <span className={styles.discountedPrice}>{productData.discont_price} $</span>
              </>
            ) : (
              <span className={styles.price}>{productData.price} $</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;