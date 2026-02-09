import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf  } from '@angular/common'; 
import { FormsModule, NgForm } from '@angular/forms';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { CreateUnitPayload, SearchQueryModel, UnitHeadModel } from '../../model/unit';
import { debounceTime, Subject } from 'rxjs';


@Component({
  selector: 'app-unit',
  imports: [NgForOf, FormsModule, CommonModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent implements OnInit{


  searchQueryModel: SearchQueryModel
  unitHeadModel: UnitHeadModel
  createUnitPayload: CreateUnitPayload
  unitData: any[] = [];
  // unitModel =
  isModalOpen = false
  isLoading = false

  searchQuery: string = ''
  page: number =1
  pageSize: number =5
  searchQuery$ = new Subject<string>() 


  constructor(private employeeserv: GetEmployeesService){
    this.searchQueryModel = new SearchQueryModel()
    this.unitHeadModel = new UnitHeadModel()
    this.createUnitPayload = new CreateUnitPayload()

    this.searchQuery$.pipe(debounceTime(500)).subscribe(()=>{
      this.searchFunction()
    })
  }

  ngOnInit(){
    this.fetchUnit() 
  }

  fetchUnit(){   
    this.isLoading = true
  this.searchQueryModel.search = this.searchQuery?.trim() || '';
   this.searchQueryModel.page = this.page ;
  this.searchQueryModel.pageSize = this.pageSize;

   this.employeeserv.getUnit(this.searchQueryModel).subscribe({
    next: (res)=>{
      this.unitData = res.data
      console.log('Response', res.message)
      this.isLoading = false
    },
    error: (err)=>{
      console.log('Failed to fetch', err.message)
      this.isLoading = false
    }
   })
  }


  onSearchChange(){
    this.searchQuery$.next(this.searchQuery)
  }
  searchFunction(){
    this.searchQueryModel.search = this.searchQuery
    this.fetchUnit()
  }

  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }


  deleteModal = false
  selectedStaffIdDelete: string | null = null;

  openDelete(id: string){
    this.selectedStaffIdDelete = id;
    console.log('ID', this.selectedStaffIdDelete)
    this.deleteModal = true
  }

  closeDeleteModal(){
    this.deleteModal = false
    this.selectedStaffIdDelete = null
  }


  deleteUnit(){
    if (!this.selectedStaffIdDelete) 
      return;
    this.employeeserv.deleteUnit(this.selectedStaffIdDelete).subscribe({
      next: (res)=>{
        console.log('Delete response', res.message)
        // this.selectedStaffIdToDelete = null;
      },
      error: (err)=>{
        console.log('Error message', err.message)
      }
    })
  }

 
selectedUnitId: string | null = null;
selectedUnitPayload: any = null;

selectedId(item: any) {
  this.selectedUnitId = item._id;
  this.selectedUnitPayload = { ...item,
    unitHead: item.unitHead?._id || null,
    parentUnit: item.parentUnit?._id || item.parentUnit || null,
    organization: item.organization?._id || null,
  };
  console.log('Selected Unit ID:', this.selectedUnitId);
}

editUnit() {
  // if (!this.selectedUnitId) return;

  // this.employeeserv.updateUnit(this.selectedUnitId, this.selectedUnitPayload).subscribe({
  //   next: () => {
  //       // this.createNotification('topRight','success', 'Unit details updated successfully.','Updated!');
  //     this.resetForm(form);
  //   },
  //   error: (err) => {
  //     console.log('Update failed', err)
  //       // this.createNotification('topRight','success', 'Edit unit failed','Failed!');
  //   }
  // });

}


resetForm(form: NgForm) {
  form.resetForm();
  this.selectedUnitId = null;
  this.selectedUnitPayload = null;
}



  onSubmit(form: NgForm){
   
//     const payload: CreateUnitPayload = {
//   name: this.createUnitPayload.name,
//   description: this.createUnitPayload.description,
//   isSubUnit: this.createUnitPayload.isSubUnit,
//   unitHead: this.createUnitPayload.unitHead,
//   parentUnit: this.createUnitPayload.parentUnit

// };
     console.log('Unit payload', this.createUnitPayload)
    this.employeeserv.createUnit(this.createUnitPayload ).subscribe({
      next: (res)=>{
        console.log('create unit', res.message)
        this.isModalOpen = false
      },
      error: (err)=>{
        console.log('Unit error', err.message)
      }
    })
   }


 
}
