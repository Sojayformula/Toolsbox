import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../../../service/auth.service';
import { CRMserviceService } from '../../../service/crmservice.service';
import { AppNotification, markAsReadModel } from '../../model/placeholder';
import { NotificationServiceService } from '../../../service/notification-service.service';
import { PaginationRequest } from '../../model/notificationModel';



interface Notification {
  _id: string;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-pageslayout',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './pageslayout.component.html',
  styleUrl: './pageslayout.component.scss'
})
export class PageslayoutComponent {

   isMobileOpen = false

    notificationModel: markAsReadModel
    paginationRequest: PaginationRequest
    showNotificationModal = false
    todayNotifications: AppNotification[] = [];
    yesterdayNotifications: AppNotification[] = [];
    selectedChoice = 'Today'
  
     //  Notification state
    notifications: AppNotification[] = [];
    filtered: AppNotification[] = [];
    unreadCount = 0;
    isNotificationOpen = false;
    isLogoutModalOpen = false


    constructor(private router: Router, private authService: AuthService,  
      private CRMservice: CRMserviceService, private notificationService: CRMserviceService,
      private notifyService: NotificationServiceService
    ){

        this.notificationModel = new markAsReadModel()
        this.paginationRequest = new PaginationRequest()
      }




          //  MODAL LINKS //
    // activeTab: 'All' | 'Read' | 'Unread' = 'All';
  
    // setTab(tab: 'All' | 'Read' | 'Unread') {
    //   this.activeTab = tab;
    // }
  
    //  INLINE TYPES — NO ALIASES
    tabs: ('all' | 'unread' | 'read')[] = ['all', 'unread', 'read'];
    activeTab: 'all' | 'unread' | 'read' = 'all'; 
  
  
    ngOnInit(){
      this.fetchNotifications()
      this.loadNotifications();
      this.nitify()
    }
  
  
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
  

  // Logout Modal
  openLogoutModal(){
    this.isLogoutModalOpen = true
  }

    closeLogoutModal(){
    this.isLogoutModalOpen = false
  }

    // logout(){
  //   localStorage.removeItem('token')
  //   this.router.navigate(['/sign-in'])
  // }
   logout(){
    this.authService.logout();       
    this.router.navigate(['/sign-in']); 
  }

  profilePage(){
    this.router.navigate(['/profile'])
  }

  openMobile(){
    this.isMobileOpen = !this.isMobileOpen
  }

   closeobile(){
    this.isMobileOpen = false
  }








 

// notifications: AppNotification[] = [];
// filtered: AppNotification[] = [];

// loading = true;

// notify() {
//   this.notifyService.getNotifications(this.paginationRequest).subscribe({
//     next: (res) => {
//       this.notifications = res.data || [];
//       this.applyFilter();
//       this.loading = false;
//     },
//     error: (err) => {
//       console.error('Failed to fetch notifications', err);
//       this.loading = false;
//     }
//   });
// }


// applyFilter2() {
//   if (!this.notifications.length) {
//     this.filtered = [];
//     return;
//   }

//   if (this.activeTab === 'unread') {
//     this.filtered = this.notifications.filter(n => !n.isRead);
//   } 
//   else if (this.activeTab === 'read') {
//     this.filtered = this.notifications.filter(n => n.isRead);
//   } 
//   else {
//     this.filtered = [...this.notifications];
//   }

//   console.log('FILTERED:', this.filtered);
// }



// markAsRead2(item: AppNotification) {
//   item.isRead = true;
//   this.applyFilter();

//   // Optional API update
//   // this.notifyService.markAsRead(item.id).subscribe();
// }





















currentFilter: 'all' | 'unread' | 'read' = 'all';
notificationsByDate: { [date: string]: AppNotification[] } = {};
filteredNotificationsByDate: { [date: string]: AppNotification[] } = {};
  loading = true;


  dateDescOrder = (a: any, b: any): number => {
  return new Date(b.key).getTime() - new Date(a.key).getTime();
};


  nitify() {
    this.notifyService.getNotifications(this.paginationRequest).subscribe({
      next: (res) => {
        this.notificationsByDate = res.data;
        console.log('print Notification', this.notificationsByDate)
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch notifications', err);
        this.loading = false;
      }
    });
  }

  markAsRead2(notification: Notification) {
    notification.isRead = true;
    // Optionally call API to update read status
  }


  applyFilter() {
  this.filteredNotificationsByDate = {};

  Object.keys(this.notificationsByDate).forEach(date => {
    const notifs = this.notificationsByDate[date];

    let filtered = notifs;
    if (this.currentFilter === 'unread') {
      filtered = notifs.filter(n => !n.isRead);
    } else if (this.currentFilter === 'read') {
      filtered = notifs.filter(n => n.isRead);
    }

    if (filtered.length > 0) {
      this.filteredNotificationsByDate[date] = filtered;
    }
  });
}
















}
