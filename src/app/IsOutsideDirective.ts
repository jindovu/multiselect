import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[isOutside]'
})
export class IsOutsideDirective {
  constructor(private elementRef: ElementRef) { }

  @Output()
  public isOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.elementRef) {
      const parent = targetElement.parentElement;
      if (!parent) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
          this.isOutside.emit(true);
        }
      }
    }
  }
}
