import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
  }
`;

export default GlobalStyle;
