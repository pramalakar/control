import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../../providers/data-service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  categories: any = [];
  articles: any = [];
  searchForm: FormGroup;
  articleForm: FormGroup;

  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private dataService: DataService) {
    this.datePickerConfig = Object.assign( {},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: true,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 1)
      });
  }

  ngOnInit() {
    this.initForm();
    this.getCategories();
    this.getArticles(this.searchForm);
  }
  getCategories() {
    this.dataService.execute('get', '/api/Article/GetCategoryNames', {}).subscribe((data) => {
      this.categories = data;
      this.categories.push({id: '', name: 'All'});
      console.log(data);
    });
  }

  getArticles(searchForm) {
    const searchInput = searchForm.value;
    const req = {
      'categoryId': searchInput.categoryId,
      'published': searchInput.published,
      'title': searchInput.title
    };
    this.dataService.execute('post', '/api/Article/SearchArticle', req).subscribe((data) => {
      this.articles = data;
      console.log(data);
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.articleForm.get('banner').setValue(reader.result.split(',')[1]);
      };
    }
  }

  submitArticle(article) {
    const req = {
      title: article.value.title,
      brief: article.value.brief,
      content: article.value.content,
      published: article.value.published,
      date: article.value.date,
      banner: article.value.banner,
      ownerId: 1
    };
    this.dataService.execute('post', '/api/Article/CreateArticle', req).subscribe((data) => {
      console.log(data);
      this.articles.push(data);
    });
  }

  // search(searchForm) {
  //   debugger;
  //   const data = searchForm.value;
  //   const req = 'categoryId=' + data.categoryId +
  //     '&published=' + data.published +
  //     '&title=' + data.title;
  //   this.dataService.execute('post', '/api/Article/SearchArticle', req).subscribe((data) => {
  //     this.articles = data;
  //     console.log(data);
  //   });
  // }

  initForm() {
    this.searchForm = new FormGroup({
      categoryId: new FormControl(''), // default value null
      published: new FormControl(''), // default value ''
      title: new FormControl('')
    });
    this.articleForm = new FormGroup({
      title: new FormControl(''), // default value null
      brief: new FormControl(''), // default value ''
      content: new FormControl(''),
      published: new FormControl(''),
      date: new FormControl(''),
      banner: new FormControl(''),
      ownerId: new FormControl('')
    });
  }

}
