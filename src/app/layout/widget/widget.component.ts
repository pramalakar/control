import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget.model';
import {WidgetRow} from '../../../models/widget-row.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  public id;
  public widgetRows;

  updateRowIndex;
  widgetRowForm: FormGroup;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initWidgetRowForm();

    this.id = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      // In a real app: dispatch action to load the details here.
      this.getWidgets(this.id);
    });
  }

  getWidgets(id: number) {
    this.dataService.execute('post', '/api/Widget/GetWidget?id=' + id, {}).subscribe((data) => {
      console.log(data);
      this.widgetRows = data;
    });
  }

  // WIDGET ROW AREA
  addBlankWidgetRow() {
    this.widgetRows.push(new WidgetRow(0, 'Title', this.widgetRows.length));
  }
  changeRowMode(i) {
    this.updateRowIndex = i;
    // this.widgetRowForm.setValue({
    //   id: this.widgetRows[i].id,
    //   title: this.widgetRows[i].title,
    //   order: this.widgetRows[i].order
    // });
  }
  restoreRowMode() {
    this.updateRowIndex = '';
    this.initWidgetRowForm();
  }

  // updateWidgetRow() {
  //   const req = 'id=' + this.widgetRowForm.value.id +
  //     '&title=' + this.widgetRowForm.value.title +
  //     '&order=' + this.widgetRowForm.value.order +
  //     '&layoutId=' + this.widgetRowForm.value.layoutId;
  //   this.dataService.execute('put', '/api/WidgetRow/UpdateWidgetRow?id=' + this.widgetRowForm.value.id, req).subscribe(() => {
  //     console.log('ladorupa');
  //     // const elementPos = this.layouts.map(function(x) {return x.id; }).indexOf(layoutForm.value.layoutId);
  //     // console.log(this.layouts[elementPos]);
  //     // this.layouts[elementPos] = {
  //     //   id: layoutForm.value.layoutId,
  //     //   name: layoutForm.value.layoutName,
  //     //   description: layoutForm.value.layoutDescription,
  //     //   statusID: layoutForm.value.layoutStatusId
  //     // };
  //     // this.clearLaoutForm();
  //   });
  // }
  removeWidgetRow(rowi) {
    this.widgetRows.splice(rowi, 1);
  }
  // WIDGET AREA
  addBlankWidget(rowi) {
    this.widgetRows[rowi].widget.push(new Widget(0, '', 0, '', '', ''));
  }

  removeWidget(rowi, widgeti) {
    console.log(widgeti);
    this.widgetRows[rowi].widget.splice(widgeti, 1);
  }

  initWidgetRowForm() {
    this.widgetRowForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', Validators.required),
      order: new FormControl()
    });
  }
}

