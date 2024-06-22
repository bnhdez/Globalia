import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './searchBox.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent implements OnInit {

  // subject es observable especial de angular
  private debouncer:Subject<string> = new Subject<string>();

  @Input()
  public placeholder:string = '';

  //envio evento al padre, que seria byCapital
  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime( 500 )
      )
      // hasta despues de pasados 1seg de no emitir valores, hace el subsribe
      .subscribe( value => {
        console.log( 'debouncer value: ', value );
      })
  }

  //emite value al mundo exterior
  emitValue( value:string ){
    this.onValue.emit( value )
  }

  onKeyPress( searchTerm:string ){
    this.debouncer.next( searchTerm );
  }
}
