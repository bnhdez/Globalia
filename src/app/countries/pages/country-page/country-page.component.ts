import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private countriesService:countriesService,
    private router:Router
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
        // si viene null redirecciono a '', segun router '' es my default
        if ( !country ) {
          return this.router.navigateByUrl('');
        }

        console.log('TENEMOS UN PAIS');
        return;
      })
  }


}
