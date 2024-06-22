import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { countriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries:Country[] = [];
  public isLoadign: boolean = false;
  public initialValue: string = '';

  constructor ( private countriesService:countriesService ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCountry( term:string ):void{
    this.isLoadign = true;
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoadign = false;
      })
  }
}
