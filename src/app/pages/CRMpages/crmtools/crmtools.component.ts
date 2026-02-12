import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { searchQueryModel } from '../../../model/model';
import { CreateTcketModel, ticketSearchModel } from '../../../model/crmManageTickets';
import { debounceTime, Subject } from 'rxjs';
import { GetEmployeesService } from '../../../../service/get-employees.service';
import { CRMserviceService } from '../../../../service/crmservice.service';
import { saveAs } from 'file-saver';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CreateMerchantModel, EditModel, ToolsModel } from '../../../model/crmtools';
import { EnrolMerchantModel } from '../../../model/EnrolMerchantModel';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-crmtools',
  imports: [FormsModule, CommonModule, NzPaginationModule],
  templateUrl: './crmtools.component.html',
  styleUrl: './crmtools.component.scss'
})
export class CRMToolsComponent {
// for the mean time
  emails: string[] = [''];
  createMerchantModel:  CreateMerchantModel

    employeesData: any[]=[]
    toolsData: any[] = []
    taggedUsers: any[] = [];
    editTicket: string = '';
    searchModel: searchQueryModel  
    createTcketModel: CreateTcketModel
    toolsModel: ToolsModel
    editModel: EditModel
  
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
    enrolMerchantModel: EnrolMerchantModel
  
    selectedTicket: any;
    comments: any[] = [];
  
    searchQuery: string = ''
    subjectQuery = new Subject<string>()
    
  
  
    constructor(private getEmployeesserv: GetEmployeesService, private crmservice: CRMserviceService,
      private crmService: CRMserviceService, private notification: NzNotificationService
    ){

      this.createMerchantModel = new CreateMerchantModel()
      this.enrolMerchantModel = new EnrolMerchantModel()
      this.toolsModel = new ToolsModel
      this.editModel = new EditModel()
  
      this.subjectQuery.pipe(debounceTime(300)).subscribe((searchTerm: string)=>{
        this.ticketModel.search = searchTerm
        this.fetchTools()
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
      this.fetchTools()
      this.fetchEmployees()
    }
  
  //  Table API
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
  
    //// Add more email fields ////
    //  addEmailField(){
    //   this.searchModel.push({email: ''})
    //  }

    //   removeEmailField(index: number){
    //   this.searchModel.splice(index, 1)
    //  }

 
  
  onSearchChange(){
    this.subjectQuery.next(this.searchQuery)
  }
  
  
  onSearch(){
     console.log('Search query', this.searchQuery)
    this.ticketModel.search = this.searchQuery.trim()
    this.page = 1
    this.fetchTools()
  }
  
  
  
    // create ticket post request
    createTicket(){
      this.crmService.getCreateTicket(this.createTcketModel).subscribe({
        next:(res)=>{
          console.log(res.message)
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
          this.createNotification("topRight", "error", "Failed to deleted merchant", err.message!!)
        }
      })
    }


    // Enrol merchant
    enrolMerchant(){
      console.log('Payload', this.toolsModel)
      this.crmService.gettoolsPost(this.toolsModel).subscribe({
        next:(res)=>{
          console.log('Tools payload', res)
        },
         error:(err)=>{
          console.log('Failed to fetch data', err)
         }
      })
    }
  
  
    selectedFundgate: string | null = null
    isEditModalOpen = false
    // Open create modal function
     openEditModal(id: string){
       this.selectedFundgate = id
      console.log('fundgate id', this.selectedFundgate)
      this.isEditModalOpen = true 
    }
  
    // Close create modal function
    closeEditModal(){
      this.isEditModalOpen = false
    }

    // Edit API
    editMerchant(){
      if(!this.selectedFundgate){
        return
      }
      this.crmservice.gettoolsEdit(this.selectedFundgate, this.editModel).subscribe({
        next:(res)=>{
          console.log('Tools payload', res.message)
        },
        error:(err)=>{
          console.log('Failed to load', err.message)
        }
      })
    }
  
    // Enrol mechant modal
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
  
       setTab(tab: 'Ticket details' | 'Mail' | 'Comments'){    
        this.activeTab = tab;
      }
  
  
       // PAGINATION //
          onPageChange(page: number){
          this.page = page
          this.fetchTools();
          console.log("leave page changed",this.page)
          }

  
    onSubmit(){
      // this.enrolMerchantModel.email = this.emails;
      this.crmservice.getCreateMerchant(this.enrolMerchantModel).subscribe({
        next:(res)=>{
          console.log('Erol merchant respone', res.message)
          this.fetchTools()
        },
        error:(err)=>{
          console.log('Post faild', err.message)
        }
      })
    }



}
