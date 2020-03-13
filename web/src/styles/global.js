import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: 0;
    background: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }


  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }


  ::-webkit-scrollbar-thumb {
    background: #7D40E7;
    border-radius: 4px;
  }


  ::-webkit-scrollbar-thumb:hover {
    background: ${darken(0.08, '#7D40E7')};
  }
`;
