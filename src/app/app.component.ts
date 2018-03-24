import {Component, OnInit} from '@angular/core';
import {DataService} from '../providers/data-service';
import {isNullOrUndefined} from 'util';

import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";


declare var BeagleApp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Admin Control App';

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit(): void {
    BeagleApp.init();

    this.dataService.init().then(() => {
      this.dataService.getAll(['token']).then(data => {
        console.log('Checking login progress: ');
        console.log('this is: ' + data['token']);
        if (!isNullOrUndefined(data)) {
          console.log('loading dashboard');
          this.router.navigate(['/dashboard/dashboard']);
        } else {
          console.log('loading login');
          this.router.navigate(['/login/login']);
        }
      });
    });
  }
}
