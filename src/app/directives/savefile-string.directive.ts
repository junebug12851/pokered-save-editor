import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[savefile-string]'
})
export class SaveFileStringDirective implements OnInit {
    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.innerHTML = '<h1>Hello World</h1>';
    }
}
