import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
import { CRMserviceService } from '../../../service/crmservice.service';
// import { MetricsService } from '../services/metrics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit{



  //  ticketMetrics = {
  //   total: 2228,
  //   open: 2228,
  //   escalated: 0,
  //   closed: 0
  // };


  constructor(private metricsService: CRMserviceService){}
  
  

     ngOnInit(): void {
    this.loadMetrics();
  }



  // loadMetrics(): void {
  //   this.metricsService.getTicketMetrics().subscribe({
  //     next: (res) => {
  //       this.createChart(res.data);
  //     },
  //     error: (err) => {
  //       console.error('Failed to load metrics', err);
  //     }
  //   });
  // }

  // createChart(data: any): void {
  //   new Chart('ticketChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Total', 'Open', 'Escalated', 'Closed'],
  //       datasets: [
  //         {
  //           label: 'Tickets',
  //           data: [
  //             data.total,
  //             data.open,
  //             data.escalated,
  //             data.closed
  //           ],
  //           backgroundColor: [
  //             '#2563eb',
  //             '#22c55e',
  //             '#f97316',
  //             '#ef4444'
  //           ]
  //         }
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           display: true
  //         }
  //       }
  //     }
  //   });
  // }




   loadMetrics(): void {
    this.metricsService.getMetrics().subscribe({
      next: (res) => {
        this.createChart(res.data);

      },
      error: (err) => {
        console.error('Failed to load toolbox metrics', err);
      }
    });
  }

  createChart(data: any): void {
    new Chart('toolboxChart', {
      type: 'bar', // change to 'doughnut' if needed
      data: {
        labels: ['Total', 'Open', 'Escalated', 'Pending', 'Closed'],
        datasets: [
          {
            label: 'Toolbox Tickets',
            data: [
              data.total,
              data.open,
              data.escalated,
              data.pending,
              data.closed
            ],
            backgroundColor: [
              '#2563eb', // total
              '#22c55e', // open
              '#f97316', // escalated
              '#eab308', // pending
              '#ef4444'  // closed
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }





}
