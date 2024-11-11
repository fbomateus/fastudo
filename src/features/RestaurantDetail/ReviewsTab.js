import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddReviewContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ReviewItemContainer = styled.div``;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  resize: none;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #F0381B;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e55337;
  }
`;

const Review = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e9e9e9;
`;

const ReviewsTab = ({ reviews }) => {
  const [newReview, setNewReview] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [allReviews, setAllReviews] = useState(reviews);

  const handleSubmit = () => {
    const newReviewObj = {
      text: newReview,
      rating: starRating,
      date: new Date().toLocaleDateString(),
    };
    setAllReviews([newReviewObj, ...allReviews]);
    setNewReview('');
    setStarRating(0);
  };

  return (
    <ReviewsContainer>
      <AddReviewContainer>
        <h4>Adicione sua avaliação</h4>
        <div>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => setStarRating(index + 1)}
              style={{ cursor: 'pointer', color: index < starRating ? '#F0381B' : '#ddd' }}
            >
              ★
            </span>
          ))}
        </div>
        <TextArea
          rows="3"
          placeholder="Escreva sua avaliação aqui..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Enviar</SubmitButton>
      </AddReviewContainer>

      <ReviewItemContainer>
        {allReviews.map((review, index) => (
          <Review key={index}>
            <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            <p>{review.text}</p>
            <small>{review.date}</small>
          </Review>
        ))}
      </ReviewItemContainer>
    </ReviewsContainer>
  );
};

export default ReviewsTab;
