import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartPopup from './CartPopup';
import { useCart } from '../features/Cart/CartContext';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid #E4E4E4;
`;

const Container = styled.div`
  max-width: 1278px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    align-items: normal;
  }
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const Logo = styled.h1`
  font-size: 35px;
  font-weight: bold;
  color: #F0381B;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CartIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #F0381B;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
`;

const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const ProfileIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #004d40;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const Header = () => {
  const [showCartPopup, setShowCartPopup] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const toggleCartPopup = () => setShowCartPopup((prev) => !prev);

  useEffect(() => {
    setShowCartPopup(false);
  }, [location]);

  return (
    <HeaderContainer>
      <Container>
        <StyledLink to="/">
          <LogoImage src="/favicon.png" alt="Fastudo"/>
          <Logo>Fastudo</Logo>
        </StyledLink>
        <UserActions>
          <CartIconContainer onClick={toggleCartPopup}>
            <AiOutlineShoppingCart size={24} color="#070707" /> {/* Define a cor do carrinho */}
            {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
            {showCartPopup && (
              <PopupWrapper>
                <CartPopup onClose={() => setShowCartPopup(false)} />
              </PopupWrapper>
            )}
          </CartIconContainer>
          <ProfileIcon>F</ProfileIcon> {/* Ícone de perfil com inicial */}
        </UserActions>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
