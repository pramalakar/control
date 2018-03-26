import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public layouts;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLayouts();
  }

  getLayouts() {
    this.dataService.execute('/api/Layout/GetLayout', {}).subscribe((data) => {
      this.layouts = data;
    });
  }
}
