/**
 * Created by Prakash Malakar on 24/03/2018.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import {DataService} from '../providers/data-service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private dataService: DataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.dataService.checkLoggedIn().then((value) => {
      if (!value) {
        this.router.navigate(['/login/login']);
        console.log('isLoggedIn: ' + value);
      }
      return value;
    });
    return true;
  }

}
