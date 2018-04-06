import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../providers/data-service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any = [];
  form: FormGroup;
  // loading = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.initForm();
    this.createForm();
    this.getCategories();
  }

  getCategories() {
    this.dataService.execute('get', '/api/Article/GetAllCategory', {}).subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      content: [''],
      banner: null
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('banner').setValue(reader.result.split(',')[1]);
      };
    }
  }
  private prepareSave(): any {
    const input = new FormData();
    // input.append('title', this.form.get('title').value);
    // input.append('content', this.form.get('content').value);
    return input;
  }

  createCategory() {
    const formModel = this.prepareSave();
    // this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    debugger;
    this.dataService.execute('post', '/api/Article/CreateCategory', this.form.value).subscribe((data) => {
      this.categories.push(data);
    });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  // initForm() {
  //   this.searchForm = new FormGroup({
  //     categoryId: new FormControl(''), // default value null
  //     published: new FormControl(''), // default value ''
  //     title: new FormControl('')
  //   });
  // }

}
