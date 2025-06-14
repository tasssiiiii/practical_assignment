import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, getCategory, getAllProducts } from '../../services/api';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../../components/ProductCard';

function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const categoryRes = await getCategory(categoryId);
        if (!categoryRes.data) throw new Error('Category not found');
        setCategory(categoryRes.data);

        const productsRes = await getAllProducts();
        const categoryProducts = productsRes.data.filter(
          product => product.categoryId == categoryId
        );
        
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  // Фильтрация продуктов при изменении параметров
  useEffect(() => {
    const filtered = products.filter(product => {
      const price = product.discont_price || product.price;
      const meetsPrice = price >= priceRange.min && price <= priceRange.max;
      const meetsDiscount = onlyDiscounted ? product.discont_price : true;
      return meetsPrice && meetsDiscount;
    });
    setFilteredProducts(filtered);
  }, [products, priceRange, onlyDiscounted]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return (
    <div className={styles.error}>
      <p>{error}</p>
      <Link to="/categories" className={styles.backLink}>Back to categories</Link>
    </div>
  );

  return (
    <div className={styles.categoryProductsPage}>
      <div className={styles.header}>
        <h1>{category?.title} Products</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/">Главная</Link>
          <span> / </span>
          <Link to="/category">Категории</Link>
          <span> / </span>
          <span>{category?.title}</span>
        </div>
      </div>

     
      <div className={styles.filters}>
        <div className={styles.priceFilter}>
          <h3>Цена, $</h3>
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

      
      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noProducts}>
            В этой категории нет товаров по выбранным фильтрам
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProductsPage;