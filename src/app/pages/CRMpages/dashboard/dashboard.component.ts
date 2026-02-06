import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AppNotification, markAsReadModel } from '../../../model/placeholder'; 
// import { Notification } from '../../../model/placeholder';
import { CRMserviceService } from '../../../../service/crmservice.service';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CreateTcketModel, ticketSearchModel } from '../../../model/crmManageTickets';
import { TicketMetricsModel } from '../../../model/crmMetrics';
import { Chart } from 'chart.js';

import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { filter } from 'rxjs';



@Component({
  selector: 'app-crmdashboard',
  imports: [FormsModule, CommonModule, NzTabsModule, NzTabsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class CRMDashboardComponent {

  notificationModel: markAsReadModel
  showNotificationModal = false
  isloading = false
  showAlert = true
  todayNotifications: AppNotification[] = [];
  yesterdayNotifications: AppNotification[] = [];
  metricsData: any={}
  selectedChoice = 'LAST_24_HOURS'
   chart: any;

   //  Notification state
   ticketModel: any[]=[]
   ticketData: any[]=[]
   groupedTickets: Record<string, CreateTcketModel[]> = {};
  notifications: AppNotification[] = [];
  filtered: AppNotification[] = [];
  unreadCount = 0;
  isNotificationOpen = false;
  page = 1
  pageSize = 10
  ticketModel2: ticketSearchModel
  toggleModel: TicketMetricsModel


   constructor(private router: Router, private crmservice: CRMserviceService,  private notificationService: CRMserviceService,){
    this.notificationModel = new markAsReadModel
    this.ticketModel2 = new ticketSearchModel()
    this.toggleModel = new TicketMetricsModel()
   }

    @ViewChild('metricsChart') metricsChart!: ElementRef<HTMLCanvasElement>;

//         //  MODAL LINKS //
  // activeTab: 'All' | 'Read' | 'Unread' = 'All';

  // setTab(tab: 'All' | 'Read' | 'Unread') {
  //   this.activeTab = tab;
  

  //  INLINE TYPES — NO ALIASES
  tabs: ('all' | 'unread' | 'read')[] = ['all', 'unread', 'read'];
  activeTab: 'all' | 'unread' | 'read' = 'all'; 


  ngOnInit(){
    this.loadNotifications();
    this.fetchMetrics1('LAST_24_HOURS')
     this.setDuration(this.selectedChoice);

    //  setTimeout(() => this.showAlert = false, 3000);
  }



//  Notification
  fetchNotifications(){
  this.notificationService.getNotification().subscribe({
    next: (res) => {
      console.log('Notification response', res)
       const data = res?.data;
      this.notifications = Array.isArray(data)
        ? data
        : Array.isArray(data?.notifications)
        ? data.notifications
        : [];
      console.log('Parsed notifications:', this.notifications);
      this.calculateUnread();
      this.filterNotifications();
    },
    error: (err) => {
      console.error('Failed to fetch notifications', err);
      this.notifications = [];
    }
  });
}


  openNotificationModal(){
    this.isNotificationOpen = true;
    this.calculateUnread();
    this.filterNotifications();
  }

  closeNotificationModal(){
    this.isNotificationOpen = false;
  }

  setTab(tab: 'all' | 'unread' | 'read'){    
    this.activeTab = tab;
    this.filterNotifications();
  }
  

  loadNotifications(){
    this.notifications = [];
    this.calculateUnread();
    this.filterNotifications();
  }


  filterNotifications(){
  if (this.activeTab === 'unread') {
    this.filtered = this.notifications.filter(n => !n.isRead);
  } else if (this.activeTab === 'read') {
    this.filtered = this.notifications.filter(n => n.isRead);
  } else {
    this.filtered = this.notifications;
  }
}

calculateUnread(){
  this.unreadCount = this.notifications.filter(n => !n.isRead).length;
}


  markAsRead(notification: AppNotification){
  if (notification.isRead) return;

  // Optimistic UI update
  notification.isRead = true;
  this.calculateUnread();
  this.filterNotifications();

  this.notificationService.markNotificationAsRead({notificationId: notification._id }).subscribe({
    error: () => {
      // rollback if needed
      notification.isRead = false;
      this.calculateUnread();
      this.filterNotifications();
    }
  });
}


markAllAsRead(){this.notificationService.markNotificationAsRead({notificationId: '' }).subscribe({
    next: () => {
      this.notifications.forEach(n => n.isRead = true);
      this.calculateUnread();
      this.filterNotifications();
    },
    error: (err) => {
      console.error('Failed to mark all as read', err);
    }
  });
}





metrics = {
  total: 0,
  open: 0,
  escalated: 0,
  closed: 0,
  pending: 0
};

fetchMetrics1(duration: string) {
  this.crmservice.getMetrics2(duration).subscribe({
    next: (res) => {
      console.log('another',res);
      this.renderChart()
      
      this.metrics = res.data; 
    },
    error: (err) => console.error(err)
  });
}


// Toggle metrics
// setDuration(duration: string) {
//   if (this.selectedChoice === duration) return;

//   this.selectedChoice = duration;
//   this.fetchMetrics();
// }

  setDuration(duration: string) {
    this.selectedChoice = duration;

    this.crmservice.getMetrics2(duration).subscribe(res => {
      this.metrics = res.data;
      this.renderChart();
    });
  }



//  renderChart() {
//     if (this.chart) {
//       this.chart.destroy(); // important to avoid duplicate charts
//     }

//     this.chart = new Chart('metricsChart', {
//       type: 'bar',
//       data: {
//         labels: ['Open', 'Escalated', 'Closed', 'Pending'],
//         datasets: [
//           {
//             label: 'Tickets',
//             data: [
//               this.metrics.open,
//               this.metrics.escalated,
//               this.metrics.closed,
//               this.metrics.pending
//             ],
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: false }
//         }
//       }
//     });
//   }


   renderChart() {
    if (!this.metricsChart) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.metricsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Open',
          'Escalated',
          'Closed',
          'Pending'
        ],
        datasets: [
          {
            label: 'Tickets',
            data: [
              this.metrics.open,
              this.metrics.escalated,
              this.metrics.closed,
              this.metrics.pending
            ],
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

}











 // fetchTicket(){
  //   this.ticketModel2.page = this.page.toString();
  //   this.ticketModel2.pageSize = this.pageSize.toString();

  //   this.crmservice.getTicket(this.ticketModel2).subscribe({
  //     next:(res)=>{
  //       console.log('Full response', res)
  //       this.ticketData = res.tickets
  //       console.log('Tickets:', res.tickets);
  //       // this.isLoading = false

  //        this.ticketData = res.tickets as CreateTcketModel[];
  //        this.groupTicketsByStatus(this.ticketData);

  //     },
  //     error:(err)=>{
  //       console.log(err.message)
  //       // this.isLoading = false
  //     }
  //   })
  // }


// fake cards
  // statusCounts: Record<string, number> = {
  //   OPEN: 0,
  //   RESOLVED: 0,
  //   ESCALATED: 0
  // };

  

  // fetchTicket() {
  //   this.crmservice.getTicket(this.ticketModel2).subscribe({
  //     next: (res) => {
  //       console.log('API RESPONSE:', res);

  //       // ✅ USE THIS DATA
  //       this.ticketData = res.tickets || [];

  //       this.calculateStatusCounts();
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

  // calculateStatusCounts() {
  //   // reset counts
  //   this.statusCounts = {
  //     OPEN: 0,
  //     RESOLVED: 0,
  //     ESCALATED: 0
  //   };

  //   this.ticketData.forEach(ticket => {
  //     const status = ticket.status?.toUpperCase();
  //     if (this.statusCounts[status] !== undefined) {
  //       this.statusCounts[status]++;
  //     }
  //   });

  //   console.log('STATUS COUNTS:', this.statusCounts);
  // }






//    closeNotificationModal(){
//     this.showNotificationModal = false
//   }

//   openNotificationModal(){
//     this.showNotificationModal = true
//   }



//   fetchNotifications() {
//   this.CRMservice.getNotification().subscribe((res) => {
//     const allNotifications: AppNotification[] = res?.data?.Yesterday || [];


//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     this.todayNotifications = [];
//     this.yesterdayNotifications = [];

//     allNotifications.forEach((notification) => {
//       const createdDate = new Date(notification.createdAt);
//       const isUnread = !notification.isRead;

//       // Sort by creation date
//       if (createdDate.toDateString() === today.toDateString()) {
//         this.todayNotifications.push(notification);
//       } else if (createdDate.toDateString() === yesterday.toDateString()) {
//         this.yesterdayNotifications.push(notification);
//       }
//     });

//     // Count only unread notifications
//     this.notificationCount = [...this.todayNotifications, ...this.yesterdayNotifications].filter(n => !n.isRead).length;
//   });
// }

// markAsRead(notification: AppNotification) {
//   if (notification.isRead) return;

//   notification.isRead = true;

//   this.notificationCount = [...this.todayNotifications, ...this.yesterdayNotifications].filter(n => !n.isRead).length;

//   const payload = { notificationId: notification._id };

//   this.CRMservice.markNotificationAsRead(payload).subscribe({
//     next: (res) => {
//       console.log('Notification marked as read:', res);
//       this.fetchNotifications(); 
//     },
//     error: (err) => {
//       console.error('Failed to mark as read', err);
//       notification.isRead = false;

//       this.notificationCount = [...this.todayNotifications, ...this.yesterdayNotifications].filter(n => !n.isRead).length;
//     }
//   });
// }

