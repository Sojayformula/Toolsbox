import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { Subject } from 'rxjs';
import { employeesModel, searchQueryModel } from '../../model/model';

@Component({
  selector: 'app-personal-information',
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit{

     staffId: any = {}
     selectedEmployee: any = {  
     firstName: '',
     phoneNumber: '',
     dateOfBirth: '',
    // staffId: '',
     educationDetails: [] as any[]
  };

    page = 1
    employeesModelData:  employeesModel;
    searchModel: searchQueryModel
    isEditOpen = false
    isMobileOpen = false

     currentStep = 1;
     totalSteps = 6;
     originalEmployee!: any;
  
    searchQuery$ = new Subject<string>();
    searchQuery: string = ''

    dob: string = '';


    constructor(private getEmployeesserv: GetEmployeesService, private employeeService: GetEmployeesService,
      private router: Router, private route: ActivatedRoute 
    ){
  
      this.employeesModelData = new employeesModel()
      this.searchModel = new searchQueryModel()
  
    }


  ngOnInit(){
    const item = this.route.snapshot.queryParamMap.get('staffId') 
    this.staffId = item

    this.fetchEmployees();
  
  }
  
   
    fetchEmployees() {
      this.getEmployeesserv.getEmployee(this.staffId).subscribe({
        next: (res) => {
          console.log('successful', res)
          this.selectedEmployee = res
          console.log('Employee', this.selectedEmployee)
          console.log(res.message)
          this.dob = res.dateOfBirth;

        },
        error: (err) => {
          console.log('failed', err)
        },
        complete: () => {
          console.log('Complete')
        }
      })
    }

onCancelEdit(){
  this.selectedEmployee
}


 openMobileMenu(){
  this.isMobileOpen = !this.isMobileOpen
 }
 closeMobileMenu() {
  this.isMobileOpen = false;
}

// Open edit modal logic
openEdit() {
  this.isEditOpen = true;
  this.originalEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
  // this.selectedEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
  // this.currentStep = 1;
}

// Next step logic
nextStep() {
  if (this.currentStep < this.totalSteps) {
    this.currentStep++;
  }
}

// Cancel edit logic
cancelEdit() {
  this.selectedEmployee = JSON.parse(JSON.stringify(this.originalEmployee));
}

// prevStep() {
//   if (this.currentStep > 1) {
//     this.currentStep--;
//   }
// }

// save logic
save() {
  this.isEditOpen = false;
}

// Set step logic
setStep(step: number) {
  this.currentStep = step;
}

// Route back logic
goBack(){
  this.router.navigate(['/page1'])
}

// Add more logic
addMore(){
  console.log('Before:', this.selectedEmployee.children);
  this.selectedEmployee.children.push({firstName: '', dod: ''})
}

// Remove logic
removeChild(index: number){
  this.selectedEmployee.children.splice(index, 1)
}

clone(){
  this.router.navigate(['/signin'])
}

}
