import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log("Constructor Called!");
  }

  ngOnInit(): void {
    console.log('ngOnInit Called!');
    console.log(`Text Content of div: ${this.header.nativeElement.textContent}`);
    console.log(`Text Content of paragraph: ${this.paragraph.nativeElement.textContent}`);
  }

  ngOnChanges(changes:SimpleChanges): void {
    console.log('ngOnChanges Called!');
    console.log(changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck Called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit Called!');
    console.log(`Text Content of paragraph: ${this.paragraph.nativeElement.textContent}`);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked Called!');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked Called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit Called!');
    console.log(`Text Content of div: ${this.header.nativeElement.textContent}`);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy Called!');
  }


}
