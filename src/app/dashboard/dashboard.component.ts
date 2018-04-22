import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {DataService} from '../../providers/data-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart;
  showLoading = false;
  datasets;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.showLoading = true;
    this.dataService.execute('post', '/api/Article/ArticleReport', {}).subscribe((val) => {
      this.showLoading = false;
      const data = val.map(res => res.count);
      const label = val.map(res => res.date);
      this.datasets = [{
        label: 'Articles',
        borderColor: '#82B1FF',
        backgroundColor: '#82B1FF',
        data: data
      }]
      this.lineChart(label, data);
    });
  }

  lineChart(label, data) {
    // Set the chart colors

    // Get the canvas element
    const ctx = document.getElementById('line-chart');

    const lineChartData = {
      labels: label,
      tooltips: {
        enabled: true,
        position: 'average'
      },
      datasets: this.datasets
    };

    const line = new Chart(ctx, {
      type: 'line',
      data: lineChartData,
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
