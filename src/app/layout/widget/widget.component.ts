import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  public id;
  public widgetRows;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      // In a real app: dispatch action to load the details here.
      this.getWidgets(this.id);
    });
  }

  getWidgets(id: number) {
    this.dataService.execute('post', '/api/Widget/GetWidget?id=' + id, {}).subscribe((data) => {
      this.widgetRows = data;
    });
  }
}
