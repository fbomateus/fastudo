import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../Cart/CartContext';

const MenuContainer = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;
  grid-template-columns: repeat(4, 1fr);

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

const MenuItem = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const MenuDetails = styled.div`
  padding: 10px;
`;

const ItemPrice = styled.p`
  margin-top: 5px;
  font-size: 14px;
`;

const AddButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #F0381B;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin: 10px 0;

  &:hover {
    background-color: #e55337;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 230px;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  color: ${({ isActive, theme }) => (isActive ? '#666' : '#666')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};

  &:hover {
    color: #666;
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;

  @media (max-width: 928px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryTab = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addItemToCart } = useCart();

  // Extrair as categorias únicas dos itens
  const categories = ['Todos', ...new Set(items.map(item => item.category))];

  const filteredItems = selectedCategory === 'Todos'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <CategoryContainer>
      <CategoriesContainer>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoriesContainer>

      <MenuContainer>
        {filteredItems.map((item) => (
          <MenuItem key={item.id}>
            <MenuImage src={item.image} alt={item.name} />
            <MenuDetails>
              <h4>{item.name}</h4>
              <ItemPrice>R$ {item.price.toFixed(2)}</ItemPrice>
              {/* <p>{item.description}</p> */}
              <AddButton onClick={() => addItemToCart(item)}>+</AddButton>
            </MenuDetails>
          </MenuItem>
        ))}
      </MenuContainer>
    </CategoryContainer>
  );
};

export default CategoryTab;
