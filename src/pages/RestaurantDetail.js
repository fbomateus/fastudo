import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineEnvironment } from 'react-icons/ai'; // Importação do ícone de localização
import CategoryTab from '../features/RestaurantDetail/CategoryTab';
import AboutTab from '../features/RestaurantDetail/AboutTab';
import ReviewsTab from '../features/RestaurantDetail/ReviewsTab';
import restaurantsData from '../services/restaurantsData';
import { useParams } from 'react-router-dom';
import { useNotification } from '../context/NotificationProvider';

const Container = styled.div`
  padding: 20px;
`;

const Banner = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const Info = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const SubInfoContainer = styled.div`
  padding: 10px 0;
`;

const SubInfo = styled.p`
  color: #666;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  color: ${({ isActive }) => (isActive ? '#F0381B' : '#666')};
  background: ${({ isActive }) => (isActive ? '#EFEFEF' : '')};

  &:hover {
    color: #F0381B;
  }
`;

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurantsData.find((r) => r.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('Category');
  const showNotification = useNotification();

  if (!restaurant) {
    showNotification('Restaurante não encontrado');
    return null;
  }

  return (
    <Container>
      <Banner style={{ backgroundImage: `url(${restaurant.bannerImage})` }} />
      <Info>
        <Title>{restaurant.name}</Title>
        <SubInfoContainer>
          <SubInfo>{restaurant.rating} ⭐ ({restaurant.reviewsCount} avaliações)</SubInfo>
          <SubInfo>
            <AiOutlineEnvironment /> {restaurant.address}
          </SubInfo>
        </SubInfoContainer>
      </Info>

      <Tabs>
        <TabButton isActive={activeTab === 'Category'} onClick={() => setActiveTab('Category')}>Categoria</TabButton>
        <TabButton isActive={activeTab === 'About'} onClick={() => setActiveTab('About')}>Sobre</TabButton>
        <TabButton isActive={activeTab === 'Reviews'} onClick={() => setActiveTab('Reviews')}>Avaliações</TabButton>
      </Tabs>

      {activeTab === 'Category' && <CategoryTab items={restaurant.menu} />}
      {activeTab === 'About' && <AboutTab description={restaurant.description} />}
      {activeTab === 'Reviews' && <ReviewsTab reviews={restaurant.reviews} />}
    </Container>
  );
};

export default RestaurantDetail;
