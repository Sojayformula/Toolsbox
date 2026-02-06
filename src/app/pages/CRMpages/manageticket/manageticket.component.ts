import { Component, OnInit, ViewChild } from '@angular/core';
import { CrmserviceService } from '../../../crmservice/crmservice.service';
import { CRMserviceService } from '../../../../service/crmservice.service';
import { CreateTcketModel, ticketSearchModel } from '../../../model/crmManageTickets';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetEmployeesService } from '../../../../service/get-employees.service';
import { searchQueryModel } from '../../../model/model';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { debounceTime, Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-manageticket',
  imports: [FormsModule, CommonModule, NzPaginationModule],
  templateUrl: './manageticket.component.html',
  styleUrl: './manageticket.component.scss'
})
export class ManageticketComponent implements OnInit {

  employeesData: any[]=[]
  ticketData: any[] = []
  taggedUsers: any[] = [];
  editTicket: string = '';
  searchModel: searchQueryModel  
  createTcketModel: CreateTcketModel
  // ticketSearchModel

  page = 1
  pageSize = 10
  totalItems: number = 10;
  totalPages = 219
  isCreateTicketOpen = false
  showDeleteModal = false
  isLoading = false
  isVisible = false
  selectedTab: string = 'All'
  deleteStaff: string | null = null
  editTicet: any = {};

  ticketModel: ticketSearchModel

  selectedTicket: any;
  comments: any[] = [];

  searchQuery: string = ''
  subjectQuery = new Subject<string>()
  


  constructor(private getEmployeesserv: GetEmployeesService, private crmservice: CRMserviceService,
    private crmService: CRMserviceService, private notification: NzNotificationService
  ){

    this.subjectQuery.pipe(debounceTime(300)).subscribe((searchTerm: string)=>{
      this.ticketModel.search = searchTerm
      this.fetchTicket()
    })

    //   this.subjectQuery.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
    //   this.ticketModel.search = searchTerm;  
    //   this.page = 1;
    //   this.fetchTicket();
    // });


    this.ticketModel = new ticketSearchModel()
    this.searchModel = new searchQueryModel()
    this.createTcketModel = new CreateTcketModel()
  }


  //  tabs: string[] = ['Ticket details', 'Summary', 'Comments'];
  // activeTab: string = 'Summary';

   tabs: ('Ticket details' | 'Mail' | 'Comments')[] = ['Ticket details', 'Mail', 'Comments'];
    activeTab: 'Ticket details' | 'Mail' | 'Comments' = 'Ticket details'; 


      // Notification
       createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string ) {
  // Map type to Tailwind classes
  const typeClasses: Record<string, string> = {
    success: 'bg-green-100 border-l-4 border-green-500 text-green-800 border-1-4 border-green-300',
    error: 'bg-red-100 border-l-4 border-red-500 text-red-800 border-1-4 border-red-300',
    info: 'bg-blue-100 border-l-4 border-blue-500 text-blue-800',
    warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800',
  };

  this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000, nzClass: typeClasses[type], });
}


  ngOnInit(){
    this.fetchTicket()
    this.fetchEmployees()
  }


  fetchTicket(){
    this.isLoading = true
    this.ticketModel.page = this.page;
    this.ticketModel.pageSize = this.pageSize;

    this.crmservice.getTicket(this.ticketModel).subscribe({
      next:(res)=>{
        console.log('Full response', res)
        this.ticketData = res.tickets
        console.log('Tickets:', res.tickets);
        this.isLoading = false

      },
      error:(err)=>{
        console.log(err.message)
        this.isLoading = false
      }
    })
  }


  // fetch all staff
  fetchEmployees() {
    this.getEmployeesserv.getaLLEmployees(this.searchModel).subscribe({
      next: (res) => {
        console.log('successful', res)
        this.employeesData = res.data
        console.log('Response body', this.employeesData)
        // res.message
      },
      error: (err) => {
        console.log('failed', err)
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }



     exportTableToCSV() {
      const table = document.getElementById('ticketData');
      const rows = table?.querySelectorAll('tr');
      const csvData = Array.from(rows || []).map(row => {
        const cols = row.querySelectorAll('td, th');
        return Array.from(cols)
          .map(col => col.textContent?.trim() || "")
          .join(',');
      }).join('\n');
  
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'table.csv');
    }



  toggle(item: string){
  this.searchModel.staffStatus = item ==='All'? '': item
  this.selectedTab = item
  this.page = 1;
  this.fetchTicket()
}

onSearchChange(){
  this.subjectQuery.next(this.searchQuery)
}


onSearch(){
   console.log('Search query', this.searchQuery)
  this.ticketModel.search = this.searchQuery.trim()
  this.page = 1
  this.fetchTicket()
}



  // create ticket post request
  createTicket(){
    this.crmService.getCreateTicket(this.createTcketModel).subscribe({
      next:(res)=>{
        console.log(res.message)
        this.fetchTicket()
        this.isCreateTicketOpen = false
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }


  //Open delete modal function
  openDeleteTicketModal(id: string){
    this.deleteStaff = id
    console.log('Delete staff id', this.deleteStaff)
    this.showDeleteModal = true 
  }

   closeDeleteTicketModal(){
    this.deleteStaff = null
    this.showDeleteModal = false 
  }

  deleteTicket(){
    if(!this.deleteStaff) return
    console.log('Delete payload', this.deleteStaff)
    this.crmService.deleteUserTicket(this.deleteStaff).subscribe({
      next:(res)=>{
        console.log('Delete response', res)
        console.log(res.message)
        this.showDeleteModal = false 
        this.createNotification("topRight", "success", "Deleted", res.message!!)
      },
      error:(err)=>{
        console.log(err.message)
         this.createNotification("topRight", "error", "Failed", err.message!!)
      }
    })
  }


  // Open create modal function
  //  openCretaModalOpen(){
  //   this.selectedTicket = null;
  //   this.comments = [];
  //   this.isCreateTicketOpen = true

  //   console.log('Selected ticket:', this.selectedTicket);
  //   console.log('Ticket comments:', this.comments);
  // }

  // // Close create modal function
  // closeCretaModalOpen(){
  //   this.isCreateTicketOpen = false
  // }

  // create ticket modal
  openCretaModalOpen() {
  this.isCreateTicketOpen = true;
  this.isVisible = false;
  setTimeout(() => {
    this.isVisible = true;
  }, 20); 
}

closeCretaModalOpen() {
  this.isVisible = false;
  setTimeout(() => {
    this.isCreateTicketOpen = false;
  }, 300);
}

  // Filter modal
  selectedChoice = 'All'
  selectedPriority = '';
  selectedStatus = '';
  startDate = '';
  endDate = '';
  isFilterOpen = false

//   openFilterModalOpen() {

//   // RESET filters when "All" is selected
//   if (this.selectedChoice === 'All') {
//     delete this.ticketModel.priority;
//     delete this.ticketModel.status;
//     delete this.ticketModel.startDate;
//     delete this.ticketModel.endDate;
//   }

//   // PRIORITY FILTER
//   if (this.selectedChoice === 'Priority' && this.selectedPriority) {
//     this.ticketModel.priority = this.selectedPriority;
//     delete this.ticketModel.status;
//     delete this.ticketModel.startDate;
//     delete this.ticketModel.endDate;
//   }

//   // STATUS FILTER
//   if (this.selectedChoice === 'Status' && this.selectedStatus) {
//     this.ticketModel.status = this.selectedStatus;
//     delete this.ticketModel.priority;
//     delete this.ticketModel.startDate;
//     delete this.ticketModel.endDate;
//   }

//   // DATE RANGE FILTER
//   if (this.selectedChoice === 'Date') {
//     if (this.startDate) {
//       this.ticketModel.startDate = this.startDate;
//     }
//     if (this.endDate) {
//       this.ticketModel.endDate = this.endDate;
//     }
//     delete this.ticketModel.priority;
//     delete this.ticketModel.status;
//   }

//   this.ticketModel.page = 1;
//   this.fetchTicket();
// }

openFilterModalOpen() {
   console.log('Print filter', this.selectedChoice)
  // First: clear all filters
  delete this.ticketModel.priority;
  delete this.ticketModel.status;
  delete this.ticketModel.startDate;
  delete this.ticketModel.endDate;

  // THEN apply based on selected choice
  if (this.selectedChoice === 'All') {
    // nothing else to apply
  }

  else if (this.selectedChoice === 'Priority' && this.selectedPriority) {
    this.ticketModel.priority = this.selectedPriority;
     console.log('Filter: PRIORITY', this.selectedPriority);
  }

  else if (this.selectedChoice === 'Status' && this.selectedStatus) {
    this.ticketModel.status = this.selectedStatus;
  }

  else if (this.selectedChoice === 'Date') {
    if (this.startDate) {
      this.ticketModel.startDate = this.startDate;
    }
    if (this.endDate) {
      this.ticketModel.endDate = this.endDate;
    }
  }

   console.log('Final ticketModel sent to API:', {
    ...this.ticketModel
  });

  this.ticketModel.page = 1;
  this.fetchTicket();
}




  // Open filter modal
  isFilterModalOpen(){
    this.isFilterOpen = true
  }

  // Close filter modal
  closeFilterModal() {
    this.isFilterOpen = false
  }

  // Reset filter modal
  resetFilters(form: any) {
    form.resetForm();

  this.selectedChoice = 'All';
  this.selectedPriority = '';
  this.selectedStatus = '';
  this.startDate = '';
  this.endDate = '';

 this.page = 1
  this.fetchTicket();
}



     setTab(tab: 'Ticket details' | 'Mail' | 'Comments'){    
      this.activeTab = tab;
    }


     // PAGINATION //
        onPageChange(page: number){
        this.page = page
        this.fetchTicket();
        console.log("leave page changed",this.page)
        }

  onSubmit(form: NgForm){}

}
