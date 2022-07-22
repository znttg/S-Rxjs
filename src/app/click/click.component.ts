import { Component, OnInit } from '@angular/core';
import { fromEvent, map, scan, throttleTime } from 'rxjs';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss']
})
export class ClickComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let count = 0;

// Without RxJS

    const BTN = document.querySelector('#btn');

    BTN?.addEventListener('click', () => console.log(`Clicked ${++count} times`));

    // let rate = 1000;
    // let lastClick = Date.now() - rate;
    // BTN?.addEventListener('click', () => {
    //   if (Date.now() - lastClick >= rate) {
    //     console.log(`Clicked ${++count} times`);
    //     lastClick = Date.now();
    //   }
    // });

// With RxJS

    fromEvent(document, 'click') // OBSERVABLE
      .pipe(
        throttleTime(1000),
        scan((count) => count + 1, 0)
      )
      .subscribe(() => console.log(`Clicked ${++count} times`));


  }
}
