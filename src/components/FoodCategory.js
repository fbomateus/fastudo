import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importando as setas do Font Awesome
import categoriesData from '../services/categoriesData';

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const ArrowButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ left }) => (left ? 'left: -25px;' : 'right: -25px;')}
`;

const CategoryContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;

  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Opera */
  }
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 120px;
  min-width: 120px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryIcon = styled.span`
  font-size: 24px;
`;

const CategoryName = styled.span`
  font-size: 14px;
  color: #333;
  margin-top: 5px;
`;

const FoodCategory = ({ onSelectCategory }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    updateArrows();
  }, []);

  const scrollContainer = (direction) => {
    const scrollAmount = direction === 'left' ? -150 : 150;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
  };

  const updateArrows = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  return (
    <CarouselWrapper>
      {showLeftArrow && (
        <ArrowButton left onClick={() => scrollContainer('left')}>
          <FaChevronLeft />
        </ArrowButton>
      )}
      <CategoryContainer ref={containerRef} onScroll={updateArrows}>
        {categoriesData.map((category, index) => (
          <CategoryCard key={index} onClick={() => onSelectCategory(category.name)}>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryContainer>
      {showRightArrow && (
        <ArrowButton onClick={() => scrollContainer('right')}>
          <FaChevronRight />
        </ArrowButton>
      )}
    </CarouselWrapper>
  );
};

export default FoodCategory;
