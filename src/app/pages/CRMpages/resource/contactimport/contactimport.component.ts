import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { searchQueryModel } from '../../../../model/model';
import { CRMserviceService } from '../../../../../service/crmservice.service';
import { addContactModel, ContactImportModel } from '../../../../model/crmcontactImport';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-contactimport',
  imports: [FormsModule, CommonModule],
  templateUrl: './contactimport.component.html',
  styleUrl: './contactimport.component.scss'
})
export class ContactimportComponent implements OnInit {

  contactData: any[]=[]
  contactModel: ContactImportModel
  searchModel: searchQueryModel
  createContactModel: addContactModel
  isLoading = false
  showDeleteModal = false
   openEditModal = false 
   isAddModal = false


  constructor(private contactService: CRMserviceService, private notification: NzNotificationService){
    this.searchModel = new searchQueryModel()
    this.contactModel = new ContactImportModel()
    this.createContactModel = new addContactModel()
  }



  ngOnInit(): void {
    this.fetchContacts()
  }

  //  createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
  //  this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   }); 
  // }
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


   // Full API for table
  fetchContacts() {
    this.isLoading = true
    this.contactService.getContact().subscribe({
      next: (res) => {
        console.log('Contacts import', res)
        this.contactData = Array.isArray(res?.data?.contacts)
        ? res.data.contacts
        : [];
        console.log(res.message)
        this.isLoading = false
      },
      error: (err) => {
        console.log( err.message )
        this.isLoading = false
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }


 selecteStaff: string | null = null 
  openAddModal(){
    this.isAddModal = true
  }

   closeAddModal(){
    this.isAddModal = false
  }


  //  create contact
   createContact(){
      console.log('Payload', this.createContactModel)
    this.contactService.getContactPost(this.createContactModel).subscribe({
      next: (res)=>{
        console.log(res.message)
         this.createNotification('topRight','success', 'Created', res.message!!);
         this.fetchContacts()
      },
      error:(err)=>{
        console.log(err.message)
        this.createNotification('topRight','error', 'Failed', err.message!!);
      }
    })
  }


  

 // Edit contact modal
    selectedStaff: string | null = null 
    isEditModal = false
  isEditModalOpen(id: string){
    this.selectedStaff = id
    console.log('Print id', id)
    this.isEditModal = true
  }

   isEditModalClose(){
    this.isEditModal = false
  }


  // Edit contact
   onSubmit(){
      if (!this.selectedStaff) {
    console.error('No staff selected');
    return;
  }
    this.contactService.getContactPatch(this.selectedStaff, this.contactModel).subscribe({
      next: (res)=>{
        console.log(res.message)
         this.createNotification('topRight','success','Edited!', res.message);
      },
      error:(err)=>{
        console.log(err.message)
         this.createNotification('topRight','error','Failed!',err.message);
      }
    })
  }



   // Delete contact modal
    deleteStaff: string | null = null 
  deleteModalOpen(id: string){
    this.deleteStaff = id
    console.log('Print id', id)
    this.showDeleteModal = true
  }

   deleteModalClose(){
    this.showDeleteModal = false
  }

  // Delete staff
   submitDelete(){
      if (!this.deleteStaff) {
    console.error('No staff selected');
    return;
  }
    this.contactService.getContactDelete(this.deleteStaff).subscribe({
      next: (res)=>{
        console.log(res.message)
         this.createNotification('topRight','success', 'Deleted',res.message);
      },
      error:(err)=>{
        console.log(err.message)
        this.createNotification('topRight','error','Failed',err.message);
      }
    })
  }


   





  // getContactDelete



 


}
