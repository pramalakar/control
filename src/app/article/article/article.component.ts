import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../../providers/data-service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  categories: any = [];
  articles: any = [];
  searchForm: FormGroup;
  constructor(private dataService: DataService) { }

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
  }

}
