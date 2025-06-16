import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import styles from './DiscountedProductsPage.module.css';

const DiscountedProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector(state => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const discounted = products.filter(product => {
        const productData = product.dataValues || product;
        return productData.discont_price && productData.discont_price < productData.price;
      });
      setFilteredProducts(discounted);
    }
  }, [products]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Sales' }
        ]}
      />

      <h1 className={styles.title}>Sales</h1>
      
      <div className={styles.resultsCount}>
        Products found: {filteredProducts.length}
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product.dataValues || product} 
            />
          ))
        ) : (
          <div className={styles.noProducts}>
            {status === 'success' ? 'Товары со скидкой отсутствуют' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountedProductsPage;