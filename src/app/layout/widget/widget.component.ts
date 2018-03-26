import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  public widgets;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getWidgets();
  }

  getWidgets() {
    // this.dataService.execute('/api/Layout/GetLayout', {}).subscribe((data) => {
    //   this.widgets = data;
    // });
  }
}
