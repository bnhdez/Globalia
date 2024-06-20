import { Component, Input } from '@angular/core';

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
}
