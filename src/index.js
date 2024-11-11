import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './features/Cart/CartContext';
import GlobalStyle from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
