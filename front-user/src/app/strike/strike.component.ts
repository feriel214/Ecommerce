import { Component } from '@angular/core';

@Component({
  selector: 'app-strike',
  template: '<del><ng-content></ng-content></del>',
})
export class StrikeComponent {}