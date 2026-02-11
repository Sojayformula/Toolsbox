import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { CommonModule, NgForOf } from '@angular/common'; 
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { employeesModel, searchQueryModel } from '../../model/model';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-page1',
  imports: [NgForOf, FormsModule, CommonModule, NzPaginationModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit{

  page = 1
  pageSize = 10
  employeesData: any[]=[];
  employeesModelData:  employeesModel;
  searchModel: searchQueryModel
  isModalOpen = false

  searchQuery$ = new Subject<string>();
  searchQuery: string = ''
  selectedTab: string = 'All';
  deleteModal = false
  isLoading = false
  selectedStatus: any = {}
 
   
  constructor(private getEmployeesserv: GetEmployeesService, private employeeService: GetEmployeesService,
    private router: Router, private route: ActivatedRoute 
  ){

    this.employeesModelData = new employeesModel()
    this.searchModel = new searchQueryModel()
  

      this.searchQuery$.pipe(debounceTime(500)).subscribe(()=>{
      this.searchFunction()
    })
  }

  ngOnInit() {
    this.fetchEmployees()
  }


  // this.employeesModelData
  fetchEmployees() {
    this.isLoading = true
    const targetId = '6984b7d9176b88292a12aa67';
    this.getEmployeesserv.getaLLEmployees(this.searchModel).subscribe({
      next: (res) => {
        console.log('successful', res)
        this.employeesData = res.data
        // Show one user
        // this.employeesData = res.data?.slice(0, 2) || []; 
        // show one particular user
        //  this.employeesData = res.data?.filter((emp: any) => emp._id === targetId) || [];

        console.log(res.message)
        this.isLoading = false
      },
      error: (err) => {
        console.log('failed', err)
        this.isLoading = false
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }


    onSearchChange() {
    this.searchQuery$.next(this.searchQuery);
  }

  searchFunction(){
    this.searchModel.search = this.searchQuery
    this.page = 1
    this.fetchEmployees()
  }


  // Route with Id (edit)
  editrouter(id: string) {
  this.router.navigateByUrl(`/personal-information?staffId=${id}`);
   console.log('Navigating with staffId:', id);
}

// editrouter(id: string) {
//   this.router.navigate(['/personal-information'], { queryParams: { staffId: id } });
// }

toggle(item: string){
  this.searchModel.staffStatus = item ==='All'? '': item
  this.selectedTab = item
  this.page = 1;
  this.fetchEmployees()
}


onSelectDept(item: string) {
  this.selectedDept = item; 
}

selectedDept: string = 'All'

filter(){
  // console.log('select', this.selectedDept)
  if(this.selectedStatus === 'All'){
    delete this.searchModel.gender
  }else{
    this.searchModel.gender = this.selectedStatus
    console.log('Filter', this.selectedStatus)
}

  this.page = 1;
  this.fetchEmployees()
}

addstaff(){
  this.router.navigate(['/addstaff'])
}

pagination(page: number){
  this.page = page;
  this.fetchEmployees()
  console.log('pagination', this.page)
}

openModal(){
  this.isModalOpen = true
}

closeModal(){
  this.isModalOpen = false
}


gonext(){
  this.router.navigate(['/personal-information'])
}

openDeleteModal(){
  this.deleteModal = true
}

closeDeleteModal(){
  this.deleteModal = false
}


     // PAGINATION //
        onPageChange(page: number){
        this.page = page
        this.fetchEmployees();
        console.log("leave page changed",this.page)
        }



// employee!: Root
// employee: any={}
// submit() {
//   const payload = {
//    educationDetails: (this.employee.educationDetails ?? []).map((e: EducationModel)=>({
//        institutionName: e.institutionName.trim(),
//       courseOfStudy: e.courseOfStudy.trim(),
//       startDate: e.startDate,
//       endDate: e.endDate,
//       certificateUrl: e.certificateUrl
//    }))
   
//   }
//    console.log('payload for education', payload)

  // this.employeeService.createUser(this.employee.staffId, payload).subscribe({
  //   next: (res) => console.log('success', res),
  //   error: (err) => console.log('failed', err)
  // });
//  }


// educationData: any={}
// onSubmit(form: NgForm) {
//   // if (form.invalid) return;


//   const payload = {
//     // _id: this.staffId,
//     educationDetails: this.educationData.educationDetails.map((edu: EducationModel) => ({
//       // _id: edu._id,
//       institutionName: edu.institutionName,
//       courseOfStudy: edu.courseOfStudy,
//       startDate: edu.startDate,
//       endDate: edu.endDate
//     }))
//   };
        //  console.log(' payload', payload)
  // this.employeeService.getaLLEmployees().subscribe({
  //   next: (res) => {
  //     console.log('Success:', res);
    
  //   },
  //   error: (err) => {
  //     console.error(' Error:', err);
  //     alert('Update failed');
  //   }
  // });
}


// }





//   submit(){
//     console.log('create user payload', this.eduModel)
//   this.employeeService.createUser(this.eduModel).subscribe({
//     next: (res)=>{
//       console.log('payload', res)
//     },
//     error: (err)=>{
//       console.log('faild to fetch data', err)
//     }
//   })
// }
