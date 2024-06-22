import { Component } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[] = []

  constructor( private countriesService:countriesService ) { }

  //recibe value emitido desde searchBoxComponent y ahora es term
  searchByCapital( term:string ):void{

    //.subscribe es un metodo para un observable que deja
    //permite manjar los datos del observable
    this.countriesService.searchCapital( term )
      .subscribe( countries =>{
        this.countries = countries;
      } );
  }
}
