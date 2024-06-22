import { Component } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[] = []
  public isLoadign:boolean = false;

  constructor( private countriesService:countriesService ) { }

  //recibe value emitido desde searchBoxComponent y ahora es term
  searchByCapital( term:string ):void{
    // esta cargando la busqueda
    this.isLoadign = true;
    //.subscribe es un metodo para un observable que deja
    //permite manjar los datos del observable
    this.countriesService.searchCapital( term )
      .subscribe( countries =>{
        this.countries = countries;
        // ya tiene los resultados
        this.isLoadign = false;
      } );
  }
}
