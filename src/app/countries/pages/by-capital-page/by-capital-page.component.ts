import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  //recibe value emitido desde searchBoxComponent y ahora es term
  searchByCapital( term:string ):void{
    console.log('Desde ByCapitalPage');
    console.log(term);
  }
}
