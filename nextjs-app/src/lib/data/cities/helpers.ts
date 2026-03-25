import type { City } from "./types";
import { cities } from "./data";
import { getCitiesWithEmployerData } from "@/lib/data/local-employers";
import { getCitiesWithNeighborhoodData } from "@/lib/data/city-neighborhoods";

export function getHighValueCitySlugs(): Set<string> {
  const citiesWithData = new Set([
    ...getCitiesWithEmployerData(),
    ...getCitiesWithNeighborhoodData(),
  ]);
  return new Set(
    cities
      .filter(c => c.searchVolume === 'high' || citiesWithData.has(c.slug))
      .map(c => c.slug)
  );
}

export const getCityBySlug = (slug: string): City | undefined => 
  cities.find(city => city.slug === slug);

export const getCitiesByState = (stateCode: string): City[] =>
  cities.filter(city => city.stateCode === stateCode);

export const getCitiesByRegion = (region: string): City[] =>
  cities.filter(city => city.region === region);

export const getHighVolumeCities = (): City[] =>
  cities.filter(city => city.searchVolume === 'high');

export const getCitiesNearMajorCity = (majorCitySlug: string): City[] =>
  cities.filter(city => city.nearbyMajorCity?.toLowerCase() === majorCitySlug.replace('-', ' '));

export const getAllCitySlugs = (): string[] =>
  cities.map(city => city.slug);

export const getUniqueStates = (): { name: string; code: string }[] => {
  const states = new Map<string, string>();
  cities.forEach(city => states.set(city.stateCode, city.state));
  return Array.from(states.entries()).map(([code, name]) => ({ name, code }));
};

export const getUniqueRegions = (): string[] => {
  return Array.from(new Set(cities.map(city => city.region)));
};
