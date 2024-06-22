import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class countriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  // no quiero que regrese el arreglo de todos, solo un country o null
  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        // recorre array, hay mas de 0, regresa el primero
        // si no viene nada regresa null
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError(error => {
          console.log(error);
          return of(null);
        })
      )
  }

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
