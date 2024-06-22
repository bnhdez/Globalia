import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './searchBox.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  // subject es observable especial de angular
  private debouncer:Subject<string> = new Subject<string>();
  private debouncerSubscription?:Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  //envio evento al padre, que seria byCapital
  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime( 500 )
      )
      // hasta despues de pasados 1seg de no emitir valores, hace el subsribe
      .subscribe( value => {
        this.onDebounce.emit( value );
      })
  }

  ngOnDestroy(): void {
    // dsestruye emicion caundo ya no la necesito
    this.debouncerSubscription?.unsubscribe();
  }

  //emite value al mundo exterior
  emitValue( value:string ){
    this.onValue.emit( value )
  }

  onKeyPress( searchTerm:string ){
    this.debouncer.next( searchTerm );
  }
}
