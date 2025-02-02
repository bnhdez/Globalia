import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { countriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [`
    button:hover{
      background-color: #ced4da;
      color: black;
    }
    .btn-dark:hover{
      background-color: #343a40;
      color: white;
    }
  `]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoadign: boolean = false;
  public regions:Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?:Region;

  constructor(private countriesService: countriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region:Region ): void {
    this.isLoadign = true;
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoadign = false;
      })
  }
}
