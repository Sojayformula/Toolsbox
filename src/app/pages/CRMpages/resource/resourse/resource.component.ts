import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppNotification, createPlaceHolModel, PaginationModel } from '../../../../model/placeholder';
import { CRMserviceService } from '../../../../../service/crmservice.service';
import { creatPlaceHolderModel, PlaceholderModel, PlaceholderUiModel } from '../../../../model/crmcreateplaceholder-model';

@Component({
  selector: 'app-resource',
  imports: [FormsModule, CommonModule],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent implements OnInit{


  page = 1
  pageSize = 14

 //  Notification state
  notifications: AppNotification[] = [];
  filteredNotifications: AppNotification[] = [];
  placeholderModel: PlaceholderModel
  unreadCount = 0;
  isNotificationOpen = false;
  isPlaceHolderOpen = false
  showDeleteModal = false
  isLoading = false


  placeHolderModel: creatPlaceHolderModel
  placeholder: PaginationModel
  placeHolderData: any[]=[]
  toolsData: any[]=[]



  //  INLINE TYPES — NO ALIASES
  tabs: ('all' | 'unread' | 'read')[] = ['all', 'unread', 'read'];
  activeTab: 'all' | 'unread' | 'read' = 'all';


  constructor(private crmService: CRMserviceService, private crmservice: CRMserviceService){
    this.placeHolderModel = new creatPlaceHolderModel()
    this.placeholder = new PaginationModel()
    this.placeholderModel = new PlaceholderModel()
  }

  ngOnInit(): void {
    this.fetchPlaceHolder()
    this.fetchTools()
    this.loadNotifications();
  }


  // Table API
   fetchPlaceHolder(){
    this.isLoading = true
    this.crmService.placeHolder(this.placeholder).subscribe({
      next:(res)=>{
        console.log(res.message)
        this.placeHolderData = res.data
        console.log('Placeholder response', res)
        this.isLoading = false
      },
      error:(err)=>{
        console.log(err.message)
        this.isLoading = false
      }
    })
   }


   //  API to fetch merchants name
    fetchTools(){
      this.crmservice.gettools().subscribe({
        next:(res)=>{
          console.log('Tools response', res)
          this.toolsData = res.response
          console.log('Tickets:', res.response);
          this.isLoading = false
  
        },
        error:(err)=>{
          console.log(err.message)
          this.isLoading = false
        }
      })
    }



// Notification
  fetchNotifications(): void {
  this.crmService.getNotification().subscribe({
    next: (res) => {
      console.log('Notification response', res)
      this.notifications = res.data || [];
      this.notifications = res?.data ?? [];
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


// Open placeholder modal
  isVisible = false;
openPlaceHolderOpen() {
  this.isPlaceHolderOpen = true;
  this.isVisible = false;
  setTimeout(() => {
    this.isVisible = true;
  }, 20); 
}

// Close placeholder modal
closePlaceHolder() {
  this.isVisible = false;
  setTimeout(() => {
    this.isPlaceHolderOpen = false;
  }, 300);
}


  openNotificationModal(): void {
    this.isNotificationOpen = true;
    this.calculateUnread();
    this.filterNotifications();
  }

  closeNotificationModal(): void {
    this.isNotificationOpen = false;
  }

  setTab(tab: 'all' | 'unread' | 'read'): void {
    this.activeTab = tab;
    this.filterNotifications();
  }

  loadNotifications(): void {
    this.notifications = [];
    this.calculateUnread();
    this.filterNotifications();
  }

  // filterNotifications(): void {
  //   if (this.activeTab === 'unread') {
  //     this.filteredNotifications = this.notifications.filter(n => !n.isRead);
  //   } else if (this.activeTab === 'read') {
  //     this.filteredNotifications = this.notifications.filter(n => n.isRead);
  //   } else {
  //     this.filteredNotifications = this.notifications;
  //   }
  // }

  // calculateUnread(): void {
  //   this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  // }
  filterNotifications(): void {
  if (this.activeTab === 'unread') {
    this.filteredNotifications = this.notifications.filter(n => !n.isRead);
  } else if (this.activeTab === 'read') {
    this.filteredNotifications = this.notifications.filter(n => n.isRead);
  } else {
    this.filteredNotifications = this.notifications;
  }
}

calculateUnread(): void {
  this.unreadCount = this.notifications.filter(n => !n.isRead).length;
}


  // markAsRead(notification: AppNotification): void {
  //   if (notification.isRead) return;

  //   notification.isRead = true;
  //   this.calculateUnread();
  //   this.filterNotifications();
  // }
  markAsRead(notification: AppNotification): void {
  if (notification.isRead) return;

  // Optimistic UI update
  notification.isRead = true;
  this.calculateUnread();
  this.filterNotifications();

  this.crmService.markNotificationAsRead({
    notificationId: notification._id
  }).subscribe({
    error: () => {
      // rollback if needed
      notification.isRead = false;
      this.calculateUnread();
      this.filterNotifications();
    }
  });
}


//   markAllAsRead(): void {
//   this.notifications = this.notifications.map(n => ({
//     ...n,
//     isRead: true
//   }));

//   this.calculateUnread();
//   this.filterNotifications();
// }
markAllAsRead(): void {
  this.crmService.markNotificationAsRead({
    notificationId: ''   // backend ignores or marks all
  }).subscribe({
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




  //Open delete modal function
  deleteStaff: string | null = null
  openDeletePlaceholder(id: string){
    this.deleteStaff = id
    console.log('Delete staff id', this.deleteStaff)
    this.showDeleteModal = true 
  }

   closeDeletePlaceholder(){
    this.deleteStaff = null
    this.showDeleteModal = false 
  }

  // delete placeholder
  deletePlaceholder(){
    if(!this.deleteStaff){
      return
    }
  }





optionsInput: string=''
  // Edit placeholder
   selectedplaceholder: string | null= null
  editplaceholder = false
  isPlaceholderOpen(id: string){
    this.selectedplaceholder = id
    console.log('Log placeholder Id', this.selectedplaceholder)
    this.editplaceholder = true
  }



    isPlaceholderClose(){
    this.editplaceholder = false
  }



  // Edit placeholder  this.placeholderModel
  placeholderUIModel: PlaceholderUiModel = {
    label: '',
    type: 'DROPDOWN',
    options: '',
    textValue: ''
  };

  // selectedplaceholder: string | null = null;

editPlaceholder() {
  if (!this.selectedplaceholder) {
    return;
  }

  // Convert UI string → API array
  const payload: PlaceholderModel = {
    label: this.placeholderUIModel.label,
    type: this.placeholderUIModel.type,
    textValue: this.placeholderUIModel.textValue,
    options: this.placeholderUIModel.type === 'DROPDOWN'
      ? this.placeholderUIModel.options
      .split(',')
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0)
      : []
  };

  console.log('PATCH Payload:', payload);

  this.crmService.getPlaceholderPatch(this.selectedplaceholder, payload).subscribe({
    next: (res) => {
      console.log('Placeholder updated:', res.message);
      this.fetchPlaceHolder();
    },
    error: (err) => {
      console.error('Failed to edit:', err.message || err);
    }
  });
}




  // for edit option

  
 label = '';
  type: 'DROPDOWN' | 'TEXT' = 'DROPDOWN';
  options = '';
  response: any;
  textValue = '';

  // create placeholder
  onSubmit() {
    const options = this.type === 'DROPDOWN'
      ? this.options.split(',').map(opt => opt.trim())
      : [];

    const placeholderData: creatPlaceHolderModel = {
      label: this.label,
      type: this.type,
      options: options,
      textValue: ""
    };

    this.crmService.getCreateplaceHolder(placeholderData).subscribe({
        next: (res) => {
          console.error( res.message)
          this.response = res
          this.fetchPlaceHolder()
        },
        error: (err) => {
          console.error( err.message)
        }
      });
  }



}