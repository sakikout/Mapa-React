import styled from 'styled-components';

/* ------------------------------ SEARCH COMPONENT STYLES ------------------------------ */
export const SearchContainer = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
    z-index: 5;
    position: absolute;
    top: 0;

    @media (max-width: 768px) {
        padding: 15px;
        left: 10px;
        right: 10px;
        top: 10px;
        max-width: unset;
    }

    @media (max-width: 480px) {
        padding: 10px;
        top: 5px;
    }
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
    width: 95%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
    background-color: #f5f5f5;
    color:rgb(3, 3, 3);

  &:focus {
    border-color:rgb(0, 0, 0);
    outline: none;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`;

export const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  color:rgb(3, 3, 3);

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TravelModeGroup = styled.div`
  margin-bottom: 15px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

export const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: black;
`;

export const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

    &:hover {
        background-color: #3367d6;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 10px;
    }
`;

export const RouteInfo = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  color:rgb(3, 3, 3);
  border-radius: 4px;
  font-size: 14px;

  p {
    margin: 5px 0;
  }
`;
/* ------------------------------ MAP COMPONENT STYLES ------------------------------ */

export const MapContainer = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;