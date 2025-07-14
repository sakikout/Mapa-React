export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  coordinate: Coordinate;
}

export interface Route {
  coordinates: Coordinate[];
  distance: number;
  duration: number;
}

export type TravelMode = 'driving-car' | 'foot-walking' | 'cycling-regular';