import styled from "styled-components";
import logo from "../public/FoodLogo.svg";
import { useState } from "react";
import { useEffect } from "react";
import SearchResult from "./components/searchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFilter = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((value) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filter);
  };

  const filterByButton = (type) => {
    setSelectedBtn(type);
    if (type === "all") {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter((value) =>
      value.type.toLowerCase().includes(type.toLowerCase())
    );

    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const allFilterBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <div className="search">
          <input
            onChange={searchFilter}
            type="text"
            placeholder="Search Food"
          />
        </div>
      </TopContainer>

      <FilterContainer>
        {allFilterBtn.map((item) => (
          <Button
            key={item.type}
            isSelected={selectedBtn === item.type}
            onClick={() => filterByButton(item.type)}
          >
            {item.name}
          </Button>
        ))}
      </FilterContainer>

      <SearchResult data={filteredData} />
    </Container>
  );
};

const Container = styled.div`
  /* max-width: 1200px;
  margin: 0 auto; */
`;

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 4px;

      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 80px;
  }
`;

const FilterContainer = styled.section`
  gap: 10px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "green" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f22f2f;
  }
`;

export default App;
