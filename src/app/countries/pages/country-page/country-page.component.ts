import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { countriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor (
    private activatedRoute:ActivatedRoute,
    private countriesService:countriesService
  ) { }

  ngOnInit(): void {
    // observable dentro de otro observable
    // debo suscribit para manipular y asignar la data
    this.activatedRoute.params
      .pipe(
        // switchMap lo convierte en nuevo observable
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) ),
      )
      .subscribe( country => {
        console.log( {country} );
      })
  }


}
