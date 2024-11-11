import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #333;
  text-align: center;
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; {new Date().getFullYear()} Fastudo. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
