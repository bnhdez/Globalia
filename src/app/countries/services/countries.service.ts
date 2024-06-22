import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class countriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  //term es el termino de la capital a buscar
  //http es tipo observable que requiere interfaz si no se especifica, regresa objeto sin metodos
  searchCapital( term:string ):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    // debo especificar que tipo de dato retornar
    //map transforma la informacion del observable
    return this.http.get<Country[]>( url )
      .pipe(
        tap( countries => console.log('Tap1', countries)),
        map( countries => [] ),
        tap( countries => console.log('Tap2', countries)),
      )
  }
}
