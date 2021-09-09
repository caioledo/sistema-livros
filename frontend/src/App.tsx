import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './contexto';
import Rotas from './rotas';

import GlobalStyle from './estilos/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Rotas />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
