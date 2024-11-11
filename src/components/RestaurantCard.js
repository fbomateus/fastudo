import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const RestaurantDetails = styled.div`
  padding: 10px;
`;

const RestaurantInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const RestaurantInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const RestaurantCard = ({ restaurant }) => {
  return (
    <StyledLink to={`/restaurant/${restaurant.id}`}>
      <CardContainer>
        <RestaurantImage src={restaurant.image} alt={restaurant.name} />
        <RestaurantDetails>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <RestaurantInfoContainer>
            <RestaurantInfo>{restaurant.rating} ⭐ {restaurant.cuisine}</RestaurantInfo>
            <RestaurantInfo>{restaurant.category}</RestaurantInfo>
          </RestaurantInfoContainer>
        </RestaurantDetails>
      </CardContainer>
    </StyledLink>
  );
};

export default RestaurantCard;
