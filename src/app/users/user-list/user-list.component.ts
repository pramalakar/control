import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  {

  readonly ROOT_URL = 'http://localhost:60882';
  users: any;
  constructor(private dataService: DataService, private http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.post('http://localhost:60882/api/users/GetAllUsers', {headers: headers}).subscribe(res => this.users = res);
  }
}
