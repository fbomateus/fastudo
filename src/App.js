import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import { NotificationProvider } from './context/NotificationProvider';
import Container from './components/Container';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </Router>
    </NotificationProvider>
  );
}

export default App;
