import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { searchLocations, getRoute } from '../services/openRouteService';
import type { Location, Coordinate, TravelMode } from '../types';

interface SearchProps {
  onRouteChange: (route: any) => void;
  onPointsChange: (start: Coordinate | null, end: Coordinate | null) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onRouteChange, onPointsChange }) => {
  const [ startQuery, setStartQuery ] = useState('');
  const [ endQuery, setEndQuery ] = useState('');
  const [ startSuggestions, setStartSuggestions ] = useState<Location[]>([]);
  const [ endSuggestions, setEndSuggestions ] = useState<Location[]>([]);
  const [ selectedStart, setSelectedStart ] = useState<Location | null>(null);
  const [ selectedEnd, setSelectedEnd ] = useState<Location | null>(null);
  const [ travelMode, setTravelMode ] = useState<TravelMode>('driving-car');
  const [ isSearching, setIsSearching ] = useState(false);

  useEffect(() => {
    if (startQuery.length > 2) {
      const timer = setTimeout(() => {
        searchLocations(startQuery).then(setStartSuggestions);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setStartSuggestions([]);
    }
  }, [startQuery]);

  useEffect(() => {
    if (endQuery.length > 2) {
      const timer = setTimeout(() => {
        searchLocations(endQuery).then(setEndSuggestions);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setEndSuggestions([]);
    }
  }, [endQuery]);

  const handleSearchRoute = async () => {
    if (!selectedStart || !selectedEnd) return;

    setIsSearching(true);
    onPointsChange(selectedStart.coordinate, selectedEnd.coordinate);

    try {
      const routeData = await getRoute(
        selectedStart.coordinate,
        selectedEnd.coordinate,
        travelMode
      );

       console.log('Dados da Rota: ', routeData);
      
      if (routeData && routeData.features && routeData.features.length > 0) {
        const coordinates = routeData.features[0].geometry.coordinates.map(
          (coord: number[]) => ({ lng: coord[0], lat: coord[1] })
        );

        console.log('Coordenadas Processadas: ', coordinates);
        
        onRouteChange({
          coordinates,
          distance: routeData.features[0].properties.segments[0].distance,
          duration: routeData.features[0].properties.segments[0].duration,
        });
      } else {
        console.warn('Formato inválido ou dados ou dados ausentes.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <S.SearchContainer>
      <S.InputGroup>
        <S.Label>Origem</S.Label>
        <S.Input
          type="text"
          value={selectedStart?.name || startQuery}
          onChange={(e) => setStartQuery(e.target.value)}
          placeholder="Digite o local de partida"
        />
        {startSuggestions.length > 0 && (
          <S.SuggestionsList>
            {startSuggestions.map((location) => (
              <S.SuggestionItem
                key={location.id}
                onClick={() => {
                  setSelectedStart(location);
                  setStartQuery(location.name);
                  setStartSuggestions([]);
                }}
              >
                {location.name}
              </S.SuggestionItem>
            ))}
          </S.SuggestionsList>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label>Destino</S.Label>
        <S.Input
          type="text"
          value={selectedEnd?.name || endQuery}
          onChange={(e) => setEndQuery(e.target.value)}
          placeholder="Digite o local de destino"
        />
        {endSuggestions.length > 0 && (
          <S.SuggestionsList>
            {endSuggestions.map((location) => (
              <S.SuggestionItem
                key={location.id}
                onClick={() => {
                  setSelectedEnd(location);
                  setEndQuery(location.name);
                  setEndSuggestions([]);
                }}
              >
                {location.name}
              </S.SuggestionItem>
            ))}
          </S.SuggestionsList>
        )}
      </S.InputGroup>

      <S.TravelModeGroup>
        <S.Label>Modo de Viagem</S.Label>
        <S.RadioGroup>
          <S.RadioLabel>
            <input
              type="radio"
              name="travelMode"
              value="driving-car"
              checked={travelMode === 'driving-car'}
              onChange={() => setTravelMode('driving-car')}
            />
            Carro
          </S.RadioLabel>
          <S.RadioLabel>
            <input
              type="radio"
              name="travelMode"
              value="foot-walking"
              checked={travelMode === 'foot-walking'}
              onChange={() => setTravelMode('foot-walking')}
            />
            A pé
          </S.RadioLabel>
          <S.RadioLabel>
            <input
              type="radio"
              name="travelMode"
              value="cycling-regular"
              checked={travelMode === 'cycling-regular'}
              onChange={() => setTravelMode('cycling-regular')}
            />
            Bicicleta
          </S.RadioLabel>
        </S.RadioGroup>
      </S.TravelModeGroup>

      <S.SearchButton
        onClick={handleSearchRoute}
        disabled={!selectedStart || !selectedEnd || isSearching}
      >
        {isSearching ? 'Calculando...' : 'Traçar Rota'}
      </S.SearchButton>

      {selectedStart && selectedEnd && (
        <S.RouteInfo>
          <p><b>Origem:</b> {selectedStart.name}</p>
          <p><b>Destino:</b> {selectedEnd.name}</p>
        </S.RouteInfo>
      )}
    </S.SearchContainer>
  );
};

export default SearchComponent;