import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {DataService} from '../../providers/data-service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private dataService: DataService, private localStorage: AsyncLocalStorage, public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  login(loginForm) {
    console.log(loginForm);
    let req = 'username=' + loginForm.value.username + '&password=' + loginForm.value.password + '&grant_type=password';
    this.dataService.execute('post', '/token', req).subscribe((data) => {
      let token = data['access_token'];
      if (token) {
        this.localStorage.setItem('token', token).subscribe(() => {
          this.dataService.checkLoggedIn().then(() => {
            console.log('checkLoggedIn returned true');
            this.router.navigate(['/dashboard']);
          });
        }, () => {
          console.log('error');
        });
      } else {
        console.log ('Login failed');
      }
    });
    // this.dataService.login(loginForm.value);
  }

}
