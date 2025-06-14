import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { api } from '../../api';
import styles from './CartPage.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '80%'
      }}>
        {children}
        <button 
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: 'white',
            color: '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

function CartPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    if (!customerData.name || !customerData.phone || !customerData.email) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      await api.createOrder({ 
        items: orderItems,
        total: totalPrice,
        status: 'pending',
        customer: customerData
      });
      
      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      console.error('Order error:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  const handlePayment = () => {
    if (!customerData.name || !customerData.phone || !customerData.email) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>Главная</Link>
          <span className={styles.breadcrumbSeparator}> / </span>
          <span className={styles.breadcrumbCurrent}>Корзина</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2 className={styles.emptyCartTitle}>Ваша корзина пуста</h2>
          <p className={styles.emptyCartText}>Добавьте товары из каталога</p>
          <Link to="/catalog" className={styles.returnBtn}>
            Вернуться в каталог
          </Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            <div className={styles.cartItemsHeader}>
              <span>Товар</span>
              <span>Количество</span>
              <span>Сумма</span>
              <span></span>
            </div>

            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.productInfo}>
                  <img 
                    src={item.image.startsWith('http') ? item.image : `http://localhost:3333${item.image}`} 
                    alt={item.name} 
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className={styles.productDetails}>
                    <Link to={`/product/${item.id}`} className={styles.productName}>
                      {item.name}
                    </Link>
                    <span className={styles.productPrice}>{item.price} ₽</span>
                  </div>
                </div>

                <div className={styles.quantityControl}>
                  <button 
                    onClick={() => dispatch(updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1)
                    }))}
                    className={styles.quantityBtn}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1
                    }))}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  {item.price * item.quantity} $
                </div>

                <button 
                  onClick={() => dispatch(removeItem(item.id))}
                  className={styles.removeBtn}
                  aria-label="Удалить товар"
                >
                  ×
                </button>
              </div>
            ))}

         
          </div>

          <div className={styles.cartSummary}>
            <h3 className={styles.summaryTitle}>Итого</h3>
            
            <div className={styles.summaryRow}>
              <span>Товары ({totalItems})</span>
              <span>{totalPrice} $</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>К оплате</span>
              <span>{totalPrice} $</span>
            </div>

            <div className={styles.customerInfo}>
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
                placeholder="Ваше имя"
                className={styles.inputField}
                required
              />
              <input
                type="tel"
                name="phone"
                value={customerData.phone}
                onChange={handleInputChange}
                placeholder="Телефон"
                className={styles.inputField}
                required
              />
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={styles.inputField}
                required
              />
            </div>

           

            <button 
              onClick={handlePayment}
              className={styles.paymentBtn}
              disabled={items.length === 0}
            >
              Оплатить
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <h2>Спасибо за покупку!</h2>
        <p>Ваш заказ успешно оплачен.</p>
      </Modal>
    </div>
  );
}

export default CartPage;