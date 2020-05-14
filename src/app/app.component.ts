import { Component, OnInit } from '@angular/core';

import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ampath-esm-angular-form-entry';
  view: string;
  constructor() {
    console.log('app loaded');
    singleSpaPropsSubject.subscribe((prop) => {
      console.log('singla spa', prop);
      this.view = prop.view;
    }, (err) => {

    });
  }
  ngOnInit(): void {

  }
}
