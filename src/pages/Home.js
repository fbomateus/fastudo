import React, { useState } from 'react';
import styled from 'styled-components';
import FoodCategory from '../components/FoodCategory';
import RestaurantCard from '../components/RestaurantCard';
import restaurantsData from '../services/restaurantsData'; // Importação correta dos dados mocados

const HomeContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
`;

const ResultsCount = styled.p`
  margin-bottom: 20px;
  color: #F0381B;
  margin-top: -10px;
  font-size: 14px;
`;

const RestaurantList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Garante 4 colunas */
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #888;
  text-align: center;
  margin-top: 20px;
`;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredRestaurants = selectedCategory === 'Todos' 
    ? restaurantsData 
    : restaurantsData.filter((restaurant) => restaurant.category === selectedCategory);

  return (
    <HomeContainer>
      <Title>Restaurantes Populares</Title>
      <ResultsCount>{filteredRestaurants.length} Resultados</ResultsCount>

      <FoodCategory onSelectCategory={setSelectedCategory} />
      
      {filteredRestaurants.length > 0 ? (
        <RestaurantList>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </RestaurantList>
      ) : (
        <NoResultsMessage>Nenhum restaurante encontrado para a categoria selecionada.</NoResultsMessage>
      )}
    </HomeContainer>
  );
};

export default Home;
