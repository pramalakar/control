import { Component, OnInit, Inject } from '@angular/core';
import {DataService} from '../../../providers/data-service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

}
