import {Component, OnInit} from '@angular/core';

declare var BeagleApp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Admin Control App';

  ngOnInit(): void {
    BeagleApp.init();

  }
}
