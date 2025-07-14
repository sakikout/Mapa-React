import React, { useState } from 'react';
import styled from 'styled-components';
import MapComponent from './components/Map';
import SearchComponent from './components/Search';
import type { Coordinate, Route } from './types';

const App: React.FC = () => {
  const [startPoint, setStartPoint] = useState<Coordinate | null>(null);
  const [endPoint, setEndPoint] = useState<Coordinate | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [travelMode, setTravelMode] = useState<string>('driving-car');

  const handleRouteChange = (newRoute: any) => {
    setRoute(newRoute);
  };

  const handlePointsChange = (start: Coordinate | null, end: Coordinate | null) => {
    setStartPoint(start);
    setEndPoint(end);
  };

  return (
    <S.Container>
      <SearchComponent
        onRouteChange={handleRouteChange}
        onPointsChange={handlePointsChange}
      />
      <MapComponent
        startPoint={startPoint}
        endPoint={endPoint}
        travelMode={travelMode}
        route={route}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    /* max-width: 800px; */
    margin: 0 auto;
    /* padding: 20px; */
  `,
  Title: styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  `,
};

export default App;