import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { CRMserviceService } from '../../../../service/crmservice.service';
import { AppNotification, markAsReadModel } from '../../../model/placeholder';
import { NotificationServiceService } from '../../../../service/notification-service.service';
import { PaginationRequest } from '../../../model/notificationModel';

// interface Notification {
//   _id: string;
//   title: string;
//   message: string;
//   link: string;
//   isRead: boolean;
//   createdAt: string;
// }

@Component({
  selector: 'app-crmpagelayout',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './crmpagelayout.component.html',
  styleUrl: './crmpagelayout.component.scss'
})
export class CrmpagelayoutComponent implements OnInit {

   notificationModel: markAsReadModel
   paginationRequest: PaginationRequest
   notifications: AppNotification[] = [];
    filtered: AppNotification[] = [];
    metricsData: any={}
  dropdownOpen = false
  mobileMenuOpen = false;
  showAlert = false
  alertVisible = false;
   isNotificationOpen = false;
   isloading = false
   unreadCount = 0;
    selectedChoice = 'LAST_24_HOURS'

   @ViewChild('metricsChart') metricsChart!: ElementRef<HTMLCanvasElement>;





  //  constructor(private router: Router){}
  constructor(private router: Router, private crmservice: CRMserviceService,  
    private notificationService: CRMserviceService, private notifyService: NotificationServiceService
   ){
      this.notificationModel = new markAsReadModel
      this.paginationRequest = new PaginationRequest()
      
     }



      //  INLINE TYPES — NO ALIASES
  tabs: ('all' | 'unread' | 'read')[] = ['all', 'unread', 'read'];
  activeTab: 'all' | 'unread' | 'read' = 'all'; 




  ngOnInit(): void {
    this.fetchNotifications()

    // setTimeout(() => this.showAlert = false, 3000);
    this.triggerAlert()

  }

triggerAlert() {
  this.showAlert = true;

  // allow DOM render first
  setTimeout(() => {
    this.alertVisible = true;
  }, 50);

  // hide after 4 seconds
  setTimeout(() => {
    this.alertVisible = false;
  }, 4000);

  // remove from DOM after animation ends
  setTimeout(() => {
    this.showAlert = false;
  }, 5200);
}
       
//  Notification
//   fetchNotifications(){
//   this.notificationService.getNotification().subscribe({
//     next: (res) => {
//       console.log('Notification response', res)
//        const data = res?.data;
//       this.notifications = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.notifications)
//         ? data.notifications
//         : [];
//       console.log('Parsed notifications:', this.notifications);
//       this.calculateUnread();
//       this.filterNotifications();
//     },
//     error: (err) => {
//       console.error('Failed to fetch notifications', err);
//       this.notifications = [];
//     }
//   });
// }

filterTabs: ('all' | 'unread' | 'read')[] = ['all', 'unread', 'read'];

currentFilter: 'all' | 'unread' | 'read' = 'all';



// currentFilter: 'all' | 'unread' | 'read' = 'all';
notificationsByDate: { [date: string]: AppNotification[] } = {};
filteredNotificationsByDate: { [date: string]: AppNotification[] } = {};
  loading = true;


  dateDescOrder = (a: any, b: any): number => {
  return new Date(b.key).getTime() - new Date(a.key).getTime();
};



get hasNotifications(): boolean {
  return Object.keys(this.filteredNotificationsByDate).length > 0;
}


 fetchNotifications() {
    this.notifyService.getNotifications(this.paginationRequest).subscribe({
      next: (res) => {
        this.notificationsByDate = res.data;
        console.log('print Notification', this.notificationsByDate)
        this.applyFilter();
         this.calculateUnread();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch notifications', err);
        this.loading = false;
      }
    });
  }


applyFilter() {
  this.filteredNotificationsByDate = {};

  Object.keys(this.notificationsByDate).forEach(date => {
    let list = this.notificationsByDate[date];

    if (this.currentFilter === 'unread') {
      list = list.filter(n => !n.isRead);
    } else if (this.currentFilter === 'read') {
      list = list.filter(n => n.isRead);
    }

    if (list.length) {
      this.filteredNotificationsByDate[date] = list;
    }
  });
}


calculateUnread() {
  this.unreadCount = Object.values(this.notificationsByDate)
    .flat()
    .filter(n => !n.isRead).length;
}


markAsRead(notification: AppNotification) {
  if (notification.isRead) return;

  notification.isRead = true;
  this.calculateUnread();
  this.applyFilter();

  this.notifyService.markNotificationAsRead({ notificationId: notification._id })
    .subscribe({ error: () => notification.isRead = false });
}


markAllAsRead() {
  Object.values(this.notificationsByDate).flat()
    .forEach(n => n.isRead = true);

  this.calculateUnread();
  this.applyFilter();

  this.notifyService.markNotificationAsRead({ notificationId: '' }).subscribe();
}

setFilter(filter: 'all' | 'unread' | 'read') {
  this.currentFilter = filter;
  this.applyFilter();
}

// setFilter(tab: 'all' | 'unread' | 'read') {
//   this.currentFilter = tab;
//   this.applyFilter();
// }








  openNotificationModal(){
    this.isNotificationOpen = true;
    this.calculateUnread();
    // this.filterNotifications();
  }

  closeNotificationModal(){
    this.isNotificationOpen = false;
  }

//   setTab(tab: 'all' | 'unread' | 'read'){    
//     this.activeTab = tab;
//     this.filterNotifications();
//   }
  

//   loadNotifications(){
//     this.notifications = [];
//     this.calculateUnread();
//     this.filterNotifications();
//   }


//   filterNotifications(){
//   if (this.activeTab === 'unread') {
//     this.filtered = this.notifications.filter(n => !n.isRead);
//   } else if (this.activeTab === 'read') {
//     this.filtered = this.notifications.filter(n => n.isRead);
//   } else {
//     this.filtered = this.notifications;
//   }
// }

// calculateUnread(){
//   this.unreadCount = this.notifications.filter(n => !n.isRead).length;
// }


//   markAsRead(notification: AppNotification){
//   if (notification.isRead) return;

//   // Optimistic UI update
//   notification.isRead = true;
//   this.calculateUnread();
//   this.filterNotifications();

//   this.notificationService.markNotificationAsRead({notificationId: notification._id }).subscribe({
//     error: () => {
//       // rollback if needed
//       notification.isRead = false;
//       this.calculateUnread();
//       this.filterNotifications();
//     }
//   });
// }

// //  markAsRead(notification: Notification) {
// //     notification.isRead = true;
// //   }


// markAllAsRead(){this.notificationService.markNotificationAsRead({notificationId: '' }).subscribe({
//     next: () => {
//       this.notifications.forEach(n => n.isRead = true);
//       this.calculateUnread();
//       this.filterNotifications();
//     },
//     error: (err) => {
//       console.error('Failed to mark all as read', err);
//     }
//   });
// }


// Fetch metrics
 fetchMetrics() {
this.crmservice.getMetrics2(this.selectedChoice).subscribe({
  next: (res: string) => {
    console.log('RAW RESPONSE:', res);
    this.metricsData = res;
    this.isloading = false;
  },
  error: (err) => {
    console.error(err);
    this.isloading = false;
  }
});

}


    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }

     closeDropdown() {
      this.dropdownOpen = false;
    }

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }

     closeMobileMenu() {
      this.mobileMenuOpen = false;
     }

     routeToTools(){
      this.router.navigate(['/tools'])
     }


    }
