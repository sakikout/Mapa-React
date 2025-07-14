import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { MapContainer } from './styles';
import { useRouteLayer } from '../hooks/useRouteLayer'
import type { Coordinate, Route } from '../types';

interface MapComponentProps {
  startPoint: Coordinate | null;
  endPoint: Coordinate | null;
  travelMode: string;
  route: Route | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
  startPoint,
  endPoint,
  travelMode,
  route,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ map, setMap ] = useState<Map | null>(null);


  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-46.6333, -23.5505]), // Centro de São Paulo
        zoom: 12,
      }),
    });

    setMap(initialMap);

    return () => initialMap.setTarget(undefined);
  }, []);


  useEffect(() => {
    if (!map || (!startPoint && !endPoint)) return;

    if (startPoint && endPoint) {
 
      const start = fromLonLat([startPoint.lng, startPoint.lat]);
      const end = fromLonLat([endPoint.lng, endPoint.lat]);
      

      const extent = [
        Math.min(start[0], end[0]),
        Math.min(start[1], end[1]),
        Math.max(start[0], end[0]),
        Math.max(start[1], end[1]),
      ];
      
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 14,
      });

    } else if (startPoint) {
      map.getView().setCenter(fromLonLat([startPoint.lng, startPoint.lat]));
      map.getView().setZoom(14);
    } else if (endPoint) {
      map.getView().setCenter(fromLonLat([endPoint.lng, endPoint.lat]));
      map.getView().setZoom(14);
    }
  }, [map, startPoint, endPoint]);


  useRouteLayer(
    map,
    route?.coordinates || null,
    travelMode
  );

  return <MapContainer ref={mapRef} />;
};

export default MapComponent;