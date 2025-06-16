import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';
import styles from './CategoryPage.module.css';
import CategoryCard from '../../components/CategoryCard';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error('Invalid categories data format');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.header}>
        <h1>Categories</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          <span> / </span>
          <span>Categories</span>
        </div>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.length > 0 ? (
          categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
            />
          ))
        ) : (
          <div className={styles.noCategories}>
            No categories
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;