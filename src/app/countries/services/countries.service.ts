import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
    // of va a regresar un nuevo observable (array vacio) con el error
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => {
          console.log(error);
          return of([])
        })
      )
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     tap( countries => console.log('Tap1', countries)),
    //     map( countries => [] ),
    //     tap( countries => console.log('Tap2', countries)),
    //   )
  }

  searchCountry( term:string ):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( error => {
          console.log(error);
          return of([]);
        })
      )
  }

  searchRegion( region:string ):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      )
  }
}
