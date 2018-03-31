import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget.model';
import {WidgetRow} from '../../../models/widget-row.model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



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


  items: WidgetRow[] = [];
  queryForm: FormGroup;
  constructor(private dataService: DataService, private route: ActivatedRoute, private fb: FormBuilder) { }


  //NEED
  ngOnInit() {
    // this.initWidgetRowForm();
    this.queryForm = this.fb.group({
      arrayOfData: this.fb.array([])
    });
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getWidgets(this.id);
    });
  }
  patchValues() {
    const control = <FormArray>this.queryForm.controls.arrayOfData;
    this.items.forEach(x => {
      control.push(this.patchValue(x.id, x.title, x.order, x.layoutId, x.widget));
    });
  }
  patchValue(id, title, order, layoutId, widget) {
    return this.fb.group({
      id: [id],
      title: [title],
      order: [order],
      layoutId: [layoutId],
      widget: [widget]
    });
  }

  getWidgets(id: number) {
    this.dataService.execute('post', '/api/Widget/GetWidget?id=' + id, {}).subscribe((data) => {
      this.items = data;
      this.patchValues();
    });
  }
  //NEED END

  // WIDGET ROW AREA
  addBlankWidgetRow() {
    debugger;
    const control = <FormArray>this.queryForm.controls.arrayOfData;
    // this.items.push(this.patchValue('', 'Title here', this.items.length + 1, this.id, []));
    // const control = <FormArray>this.queryForm.controls.arrayOfData;
    // control.push(this.fb.group({
    //     arrayOfData: this.fb.array([])
    //   })
    // );
    const req =
      'title=' + '' +
      '&order=' + (control.length + 1) +
      '&layoutId=' + this.id;
    this.dataService.execute('post', '/api/WidgetRow/CreateWidgetRow', req).subscribe((data) => {
      control.push(this.patchValue(data.id, 'Title here', data.order, data.layoutId, data.widget));
    });
  }
  changeRowMode(i) {
    this.updateRowIndex = i;
    console.log(this.updateRowIndex);
    // this.widgetRowForm.setValue({
    //   id: this.widgetRows[i].id,
    //   title: this.widgetRows[i].title,
    //   order: this.widgetRows[i].order
    // });
  }
  restoreRowMode() {
    this.updateRowIndex = '';
    // this.initWidgetRowForm();
  }

  updateWidgetRow(queryForm) {
    const data = queryForm.controls.arrayOfData.value[this.updateRowIndex];
    console.log(data);
    const req = 'id=' + data.id +
      '&title=' + data.title +
      '&order=' + data.order +
      '&layoutId=' + data.layoutId;
    this.dataService.execute('put', '/api/WidgetRow/UpdateWidgetRow?id=' + data.id, req).subscribe(() => {
      this.updateRowIndex = '';
    });
  }
  removeWidgetRow(id) {
    console.log(this.items.findIndex(item => item.id === id));

    this.dataService.execute('delete', '/api/WidgetRow/DeleteWidgetRow?id=' + id, {}).subscribe(() => {
      const control = <FormArray>this.queryForm.controls.arrayOfData;
      control.removeAt(this.items.findIndex(item => item.id === id));
    });
  }
  // WIDGET AREA
  addBlankWidget(rowi) {
    // this.widgetRows[rowi].widget.push(new Widget(0, '', 0, '', '', ''));
    // const control = <FormArray>this.queryForm.controls.arrayOfData;
    // queryForm.value.arrayOfData[rowi].push(new Widget(0, '', 0, '', '', ''));

  }

  removeWidget(rowi, widgeti, id) {
    console.log(widgeti);
    // this.widgetRows[rowi].widget.splice(widgeti, 1);
    this.dataService.execute('delete', '/api/Widget/DeleteWidget?id=' + id, {}).subscribe(() => {
      // this.updateRowIndex = '';
    });
  }

  // initWidgetRowForm() {
  //   this.widgetRowForm = new FormGroup({
  //     id: new FormControl(),
  //     title: new FormControl('', Validators.required),
  //     order: new FormControl()
  //   });
  // }
}

