import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../features/Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationProvider';

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 0;
    grid-template-columns: 1fr;
  }
`;

const BillingDetails = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const BillingFields = styled.div`
  margin: 20px 0;
`;

const Summary = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CartItemContainer  = styled.div`
  margin: 20px 0;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Total = styled.p`
  margin: 20px 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #F0381B;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e55337;
  }
`;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const showNotification = useNotification();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    clearCart();
    showNotification('Compra realizada com sucesso!');
    navigate('/');
  };

  return (
    <CheckoutContainer>
      <BillingDetails>
        <h3>Detalhes de Pagamento</h3>
        <BillingFields>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="Email" />
          <Input name="phone" placeholder="Telefone" />
          <Input name="zip" placeholder="CEP" />
          <Input name="address" placeholder="Endereço" />
        </BillingFields>
      </BillingDetails>

      <Summary>
        <h3>Seu Carrinho</h3>
        <CartItemContainer>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </CartItem>
          ))}
        </CartItemContainer>
        <hr />
        <Total>Total: R$ {total.toFixed(2)}</Total>
        <CheckoutButton onClick={handlePayment}>Pagar</CheckoutButton>
      </Summary>
    </CheckoutContainer>
  );
};

export default Checkout;
