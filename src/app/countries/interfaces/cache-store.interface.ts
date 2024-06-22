import { Country } from "./country.interface"

export interface CacheStore {
  byCapital:TermCountries,
  byCountry:TermCountries,
  byRegion:
}

export interface TermCountries {
  term:string,
  countries:Country[]
}
