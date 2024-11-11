import React from 'react';
import styled from 'styled-components';

const DescriptionContainer = styled.div`
  margin-top: 20px;
`;

const Description = styled.p`
  margin-top: 20px;
`;

const AboutTab = ({ description }) => {
  return (
    <DescriptionContainer>
      <h4>Sobre</h4>
      <Description>{description}</Description>
    </DescriptionContainer>
  );
};

export default AboutTab;
