import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../store/slices/productsSlice';
import { addItem } from '../../store/slices/cartSlice';
import Breadcrumbs from '../../components/Breadcrumbs';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct && currentProduct.length > 0) {
      const product = currentProduct[0];
      dispatch(addItem({
        id: product.id,
        name: product.title,
        price: product.discont_price || product.price,
        image: product.image,
        quantity: quantity
      }));
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (status === 'loading') {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!currentProduct || currentProduct.length === 0) {
    return <div className={styles.container}>Product not found</div>;
  }

  const product = currentProduct[0];

  return (
    <div className={styles.container}>
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'All produts', path: '/catalog' },
          { label: product.title }
        ]}
      />

      <div className={styles.productContainer}>
        <div className={styles.productImageContainer}>
          <img 
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            className={styles.productImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-product.jpg';
            }}
          />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          
          <div className={styles.priceContainer}>
            {product.discont_price ? (
              <>
                <span className={styles.oldPrice}>{product.price} $</span>
                <span className={styles.discountedPrice}>{product.discont_price} $</span>
                <span className={styles.discountPercent}>
                  {Math.round((1 - product.discont_price / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className={styles.price}>{product.price} $</span>
            )}
          </div>

          <div className={styles.quantityControls}>
            <button 
              onClick={decreaseQuantity}
              className={styles.quantityButton}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className={styles.addToCartButton}
          >
            Add to cart
          </button>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;