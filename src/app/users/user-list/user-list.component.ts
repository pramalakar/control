import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';


class Person {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit  {

  dtOptions: any;
  persons: any;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.dtOptions = {
      buttons: [
        'copy', 'excel', 'pdf', 'print'
      ],
      dom:
      '<\'row be-datatable-header\'<\'col-sm-6 text-left\'f><\'col-sm-6\'B>>' +
      '<\'row be-datatable-body\'<\'col-sm-12\'tr>>' +
      '<\'row be-datatable-footer\'<\'col-sm-5\'i><\'col-sm-7\'p>>'
    };
    this.persons = [
      {
        'first': 'Prakash',
        'last': 'Malakar',
        'email': 'pramalakar.2010@gmail.com'
      }
    ];
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


}
