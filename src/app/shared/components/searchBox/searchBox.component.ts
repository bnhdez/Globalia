import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'shared-search-box',
    templateUrl: './searchBox.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent {

  @Input()
  public placeholder:string = '';

  //envio evento al padre, que seria byCapital
  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  //emite value al mundo exterior
  emitValue( value:string ){
    this.onValue.emit( value )
  }
}
