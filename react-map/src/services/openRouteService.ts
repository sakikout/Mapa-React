import type { Coordinate, Location } from '../types';

const API_KEY = 'api_key_here';

export const searchLocations = async (query: string): Promise<Location[]> => {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${API_KEY}&text=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    
    if (!data.features) return [];
    
    return data.features.map((feature: any) => ({
      id: feature.properties.id,
      name: feature.properties.label,
      coordinate: {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      },
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const getRoute = async ( start: Coordinate, end: Coordinate, travelMode: string ): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${travelMode}?api_key=${API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
};