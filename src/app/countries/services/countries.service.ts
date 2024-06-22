import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class countriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) { }

  // recibo url especifico segun metodos abajo, excepto alphacode
  private getCountriesRequest( url:string ):Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError(error => {
          console.log(error);
          return of([])
        }),
        // delay( 1000 )
      )
  }

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
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries } )
      )
    // debo especificar que tipo de dato retornar
    // of va a regresar un nuevo observable (array vacio) con el error
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError( error => {
    //       console.log(error);
    //       return of([])
    //     })
    //   )
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     tap( countries => console.log('Tap1', countries)),
    //     map( countries => [] ),
    //     tap( countries => console.log('Tap2', countries)),
    //   )
  }

  searchCountry( term:string ):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term, countries })
      )
  }

  // region es de interfaz region
  searchRegion( region:Region ):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries })
      )
  }
}
