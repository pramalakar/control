import {AfterViewInit, Component, OnInit} from '@angular/core';
// import {Subject} from 'rxjs/Subject';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  {

  users: any;
  constructor(private dataService: DataService, private http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    this.dataService.execute('post', '/api/users/GetAllUsers', {}).subscribe((data) => {
      this.users = data;
    });
  }
}
