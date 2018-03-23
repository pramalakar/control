import { Component, OnInit, Inject } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  constructor(private dataService: DataService, private http: HttpClient) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    // this.login();
  }

  login(loginForm) {
    // let form = this.loginForm.value;
    // console.log(this.loginForm.value);
    // this.dataService.login(this.form.email, this.form.password);
    // this.dataService.login('it@malakar.com.au', 'testtest');
    this.dataService.login(loginForm.value);

    // this.http.post('http://localhost:60882/token', 'grant_type=password&username=it@malakar.com.au&password=testtest',
    //   {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})})
    //   .subscribe(res => console.log(res));
  }

}
