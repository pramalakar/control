import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../../providers/data-service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any = [];
  // searchForm: FormGroup;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.initForm();
    this.getCategories();
  }

  getCategories() {
    this.dataService.execute('get', '/api/Article/GetAllCategory', {}).subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }
  // initForm() {
  //   this.searchForm = new FormGroup({
  //     categoryId: new FormControl(''), // default value null
  //     published: new FormControl(''), // default value ''
  //     title: new FormControl('')
  //   });
  // }

}
