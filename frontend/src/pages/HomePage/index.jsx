
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchAllProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import saleImage from '../../assets/images/sale.png'; 
import styles from './HomePage.module.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const { categories, products, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

 
  const normalizedProducts = products.map(p => ({
    ...(p.dataValues || p),
    name: p.dataValues?.title || p.title
  }));

  const featuredProducts = normalizedProducts.slice(0, 8);

  return (
    <div className={styles.container}>
      
      <section className={styles.hero}>
        
        <div className={styles.heroContent}>
          <h1>Потрясающие скидки на товары для сада и огорода</h1>
          
          <Link to="/catalog" className={styles.ctaButton}>Смотреть каталог</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Категории товаров</h2>
         <Link to="/category" className={styles.viewAllButton}>
            Смотреть все
          </Link></div>
        <div className={styles.categoriesGrid}>
          {status === 'loading' ? (
            <p>Загрузка...</p>
          ) : (
            categories.slice(0, 4).map(category => {
              const categoryData = category.dataValues || category;
              return (
                <CategoryCard 
                  key={categoryData.id} 
                  category={{
                    ...categoryData,
                    name: categoryData.name || categoryData.title
                  }} 
                />
              );
            })
          )}
        </div>
      </section>

        <section className={styles.discountSection}>
        <div className={styles.discountContainer}>
          <div className={styles.saleImageContainer}>
            <img 
              src={saleImage} 
              alt="Скидка" 
              className={styles.saleImage}
            />
          </div>
          
          <div className={styles.discountContent}>
            <h2 className={styles.discountTitle}>Скидка 5% на первый заказ</h2>
            <p className={styles.discountText}>Оставьте свои данные и получите промокод на скидку</p>
            
            <div className={styles.formWrapper}>
              <form className={styles.discountForm}>
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className={styles.discountInput}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Номер телефона" 
                  className={styles.discountInput}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Электронная почта" 
                  className={styles.discountInput}
                  required
                />
                <button type="submit" className={styles.discountButton}>
                  Получить скидку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      <section className={styles.section}>
        <div className={styles.sectionHeader}>
  <h2 className={styles.sectionTitle}>Товары со скидкой</h2>
   <Link 
            to="/discounted" 
            className={styles.viewAllButton}
          >
            Смотреть все
          </Link></div>
  <div className={styles.productsGrid}>
    {status === 'loading' ? (
      <p>Загрузка...</p>
    ) : (
      normalizedProducts
        .filter(product => product.discont_price && product.discont_price < product.price)
        .slice(0, 4) 
        .map(product => (
          <ProductCard key={product.id} product={product} />
        ))
    )}
  </div>
</section>
    </div>
  );
};

export default HomePage;