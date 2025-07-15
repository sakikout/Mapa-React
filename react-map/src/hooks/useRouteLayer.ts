import { useEffect } from 'react';
import { LineString } from 'ol/geom';
import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import type { Coordinate } from '../types.ts';
import { Style, Stroke } from 'ol/style';

export const useRouteLayer = (
  map: Map | null,
  coordinates: Coordinate[] | null,
  travelMode: string
) => {
  useEffect(() => {
    if (!map || !coordinates || coordinates.length < 2) return;

    const routeCoords = coordinates.map(coord => [coord.lng, coord.lat]);
    const lineString = new LineString(routeCoords);
    const feature = new Feature({
      geometry: lineString,
    });

    const vectorSource = new VectorSource({
      features: [feature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: getColorForTravelMode(travelMode),
          width: 4,
        }),
      }),
    });

    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, coordinates, travelMode]);
};


const getColorForTravelMode = (mode: string): string => {
  switch (mode) {
    case 'driving-car':
      return '#4285F4';
    case 'foot-walking':
      return '#0F9D58';
    case 'cycling-regular':
      return '#EA4335';
    default:
      return '#000000';
  }
};