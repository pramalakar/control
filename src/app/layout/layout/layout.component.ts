import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../../../providers/data-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layoutForm: FormGroup;
  public layouts;
  public isCollapsedHorizontal = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.layoutForm = new FormGroup({
      layoutName: new FormControl('', Validators.required),
      layoutDescription: new FormControl()
    });

    this.getLayouts();
  }

  getLayouts() {
    this.dataService.execute('post', '/api/Layout/GetLayout', {}).subscribe((data) => {
      this.layouts = data;
    });
  }

  addLayout(layoutForm) {
    let req = 'name=' + layoutForm.value.layoutName + '&description=' + layoutForm.value.layoutDescription;
    console.log('layoutform ');
    console.log(req);
    this.dataService.execute('post', '/api/Layout/CreateLayout', req).subscribe((data) => {
      this.layouts.push(data);
    });
  }

  deleteLayout(index, layoutId) {
    this.dataService.execute('delete', '/api/Layout/DeleteLayout?id=' + layoutId, {}).subscribe(() => {
      this.layouts.splice(index, 1);
    });
  }
}
