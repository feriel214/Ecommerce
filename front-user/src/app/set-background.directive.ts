import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appSetBackground]'
})
export class SetBackgroundDirective implements OnChanges {
  @Input('appSetBackground')
  backgroundImage!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.backgroundImage) {
      this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${this.backgroundImage})`);
    }
  }
}
