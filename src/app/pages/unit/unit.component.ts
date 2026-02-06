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
  selectedStaffIdToDelete: string | null = null;

  openDeleteModal(id: string){
    this.selectedStaffIdToDelete = id;
    console.log('ID', this.selectedStaffIdToDelete)
    this.deleteModal = true
  }

  closeDeleteModal(){
    this.deleteModal = false
  }

  deleteStaff(){
    if (!this.selectedStaffIdToDelete) return;
    this.employeeserv.deleteUnit(this.selectedStaffIdToDelete).subscribe({
      next: (res)=>{
        console.log('Delete response', res.message)
        // this.selectedStaffIdToDelete = null;
      },
      error: (err)=>{
        console.log('Error message', err.message)
      }
    })
  }

  editrouter(){}



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
