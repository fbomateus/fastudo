import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../features/Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationProvider';

const PopupContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 30px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  z-index: 10;

  @media (max-width: 768px) {
    right: -30px;
    top: 35px;
  }
`;

const CardItemContainer = styled.div`
  padding: 20px 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CartImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const CartDetails = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const CartItemPrice = styled.div`
  font-size: 14px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 10px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#F0381B')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#e55337')};
  }
`;

const CartPopup = ({ onClose }) => {
  const { cartItems, removeItemFromCart } = useCart();
  const showNotification = useNotification();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
      onClose(); // Fecha o popup ao navegar para a página de checkout
    }
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
    showNotification('Item removido do carrinho!');
  };

  // Fecha o popup se o clique for fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <PopupContainer ref={popupRef} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>✖</CloseButton>
      <h4>Meu Pedido</h4>
      <CardItemContainer>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id}>
              <CartImage src={item.image} alt={item.name} />
              <CartDetails>
                <p>{item.name}</p>
                <CartItemPrice>R$ {item.price.toFixed(2)} x {item.quantity}</CartItemPrice>
              </CartDetails>
              <RemoveButton onClick={() => handleRemoveItem(item.id)}>❌</RemoveButton>
            </CartItem>
          ))
        ) : (
          <p>O carrinho está vazio.</p>
        )}
      </CardItemContainer>
      <CheckoutButton 
        onClick={handleCheckout} 
        disabled={cartItems.length === 0}
      >
        Finalizar Compra (R$ {total.toFixed(2)})
      </CheckoutButton>
    </PopupContainer>
  );
};

export default CartPopup;
