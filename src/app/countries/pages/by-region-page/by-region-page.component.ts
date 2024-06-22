import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { countriesService } from '../../services/countries.service';

//regiones permitidas para busqueda
type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions:Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  constructor(private countriesService: countriesService) { }

  searchByRegion(term: string): void {
    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries;
      })
  }
}
