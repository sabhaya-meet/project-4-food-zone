import React from "react";
import styled from "styled-components";
import { BASE_URL, Button } from "../../App";

const SearchResult = ({ data }) => {
  return (
    <FoodCartContainer>
      <FoodCarts>
        {data?.map((food) => (
          <FoodCart key={food.name}>
            <div className="food_image">
              <img src={BASE_URL + food.image} alt="" />
            </div>
            <div className="food_info">
              <div className="info">
                <h3>{food.name}</h3>
                <p>{food.text}</p>
              </div>
              <Button>${food.price.toFixed(2)}</Button>
            </div>
          </FoodCart>
        ))}
      </FoodCarts>
    </FoodCartContainer>
  );
};

const FoodCartContainer = styled.section`
  background-image: url("/bg.png");
  min-height: calc(100vh - 210px);
  background-size: cover;
`;

const FoodCarts = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const FoodCart = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05); /* slight white overlay */
  border-radius: 1rem;
  padding: 8px;
  width: 340px;
  height: 167px;
  color: white;
  overflow: hidden;
  backdrop-filter: blur(10px); /* blur effect */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  .food_info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: end;

    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
    }

    button {
      font-size: 12px;
    }
  }
`;
export default SearchResult;
