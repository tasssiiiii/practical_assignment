import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(product => {
        const productData = product.dataValues || product;
        const matchesSearch = productData.title.toLowerCase().includes(searchTerm.toLowerCase());
        const price = productData.discont_price || productData.price;
        const matchesPrice = price >= priceRange.min && price <= priceRange.max;
        const matchesDiscount = onlyDiscounted ? productData.discont_price : true;
        
        return matchesSearch && matchesPrice && matchesDiscount;
      });
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm, priceRange, onlyDiscounted]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка загрузки: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Каталог товаров</h1>
      
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      
      <div className={styles.filters}>
        <div className={styles.priceFilter}>
          <h3>Цена, ₽</h3>
          <div className={styles.priceInputs}>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              min="0"
              placeholder="От"
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              min={priceRange.min}
              placeholder="До"
            />
          </div>
        </div>

        <div className={styles.discountFilter}>
          <label>
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={() => setOnlyDiscounted(!onlyDiscounted)}
            />
            <span>Только со скидкой</span>
          </label>
        </div>
      </div>

      
      <div className={styles.resultsCount}>
        Найдено товаров: {filteredProducts.length}
      </div>
      
      
      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noProducts}>
            {searchTerm ? 'Ничего не найдено' : 'Товары отсутствуют'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;