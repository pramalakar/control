import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare var BeagleApp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Admin Control App';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    BeagleApp.init();
  }
}
