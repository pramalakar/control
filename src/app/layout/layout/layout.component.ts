import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mode;
  layoutForm: FormGroup;
  public layouts;
  public isCollapsedHorizontal = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.layoutForm = new FormGroup({
      layoutId: new FormControl(),
      layoutName: new FormControl('', Validators.required),
      layoutDescription: new FormControl(),
      layoutStatusId: new FormControl()
    });

    this.getLayouts();
  }

  getLayouts() {
    this.dataService.execute('post', '/api/Layout/GetLayout', {}).subscribe((data) => {
      this.layouts = data;
      console.log(data);
    });
  }

  //ADD LAYOUT
  openAddForm() {
    this.mode = 'add';
  }
  addLayout(layoutForm) {
    let req = 'name=' + layoutForm.value.layoutName + '&description=' + layoutForm.value.layoutDescription;
    this.dataService.execute('post', '/api/Layout/CreateLayout', req).subscribe((data) => {
      this.layouts.push(data);
      this.clearLaoutForm();
    });
  }

  //EDIT LAYOUT
  openUpdateForm(index) {
    this.mode = 'update';
    this.layoutForm.setValue({
      layoutId: this.layouts[index].id,
      layoutName: this.layouts[index].name,
      layoutDescription: this.layouts[index].description,
      layoutStatusId: this.layouts[index].statusID
    });
  }

  updateLayout(layoutForm) {
    const req = 'id=' + layoutForm.value.layoutId +
      '&name=' + layoutForm.value.layoutName +
      '&description=' + layoutForm.value.layoutDescription +
      '&statusId=' + layoutForm.value.layoutStatusId;
    this.dataService.execute('put', '/api/Layout/UpdateLayout?id=' + layoutForm.value.layoutId, req).subscribe(() => {
      const elementPos = this.layouts.map(function(x) {return x.id; }).indexOf(layoutForm.value.layoutId);
      console.log(this.layouts[elementPos]);
      this.layouts[elementPos] = {
        name: layoutForm.value.layoutName,
        description: layoutForm.value.layoutDescription,
        statusID: layoutForm.value.layoutStatusId
      };
      this.clearLaoutForm();
    });
  }

  deleteLayout(index, layoutId) {
    this.dataService.execute('delete', '/api/Layout/DeleteLayout?id=' + layoutId, {}).subscribe(() => {
      this.layouts.splice(index, 1);
    });
  }

  activateLayout(layoutId) {
    console.log('activate layout');
    this.dataService.execute('post', '/api/Layout/ActivateLayout?id=' + layoutId, {}).subscribe((data) => {
      console.log(data);
      const elementPos = this.layouts.map(function(x) {return x.id; }).indexOf(data.id);
      this.layouts[elementPos] = data;
    });
  }

  clearLaoutForm() {
    this.layoutForm.setValue({
      layoutId: '',
      layoutName: '',
      layoutDescription: '',
      layoutStatusId: ''
    });
  }
}
