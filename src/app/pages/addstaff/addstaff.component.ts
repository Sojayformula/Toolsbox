import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateStaffModel, searchQueryModel } from '../../model/model';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { EducationModel } from '../../model/model';


@Component({
  selector: 'app-addstaff',
  imports: [FormsModule, CommonModule],
  templateUrl: './addstaff.component.html',
  styleUrl: './addstaff.component.scss'
})
export class AddstaffComponent implements OnInit{


  employeeData: CreateStaffModel
  isEditOpen = false
  currentStep: number = 1;
  totalSteps = 6;
  originalData: any = {}
  isMobileOpen = false
  searchModel: searchQueryModel
  employeesData: any[] = []


  @ViewChild('form') form!: NgForm;


  constructor(private getEmployeesserv: GetEmployeesService, private router: Router, private employeeService: GetEmployeesService){
    this.employeeData = new CreateStaffModel() 
    this.employeeData = new CreateStaffModel();   
  // this.employeeData.educationDetails = [];
  this.searchModel = new searchQueryModel()

    this.employeeData.children = [
    { fullName: '', dob: '', birthCertificateUrl: '' },
  ];
  }



ngOnInit() {

}


 fetchEmployees() {
    // this.isLoading = true
    this.getEmployeesserv.getaLLEmployees(this.searchModel).subscribe({
      next: (res) => {
        console.log('successful', res)
        this.employeesData = res.data
        console.log(res.message)
        // this.isLoading = false
      },
      error: (err) => {
        console.log('failed', err)
        // this.isLoading = false
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }

 

completedSteps: boolean[] = [false, false, false, false, false, false];

updateStepStatus(step: number, form: any) {
  this.completedSteps[step - 1] = form.valid;
}



// Ascept only letters
  allowOnlyLetters(event: KeyboardEvent){
  const ltters = event.key;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(ltters)) {
    event.preventDefault(); 
  }
}

allowNumbersOnly(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}


/// Add more ///
  addMore(){
    this.employeeData.children.push({fullName: '', dob: ''})
    console.log('push child', this.employeeData.children)
  }
  removeChild(index: number){
    this.employeeData.children.splice(index, 1)
  }

  /// Setps ///
  setStep(step: number) {
  this.currentStep = step;
}


  openEdit(){
    this.isEditOpen = true
    this.currentStep = 1 
     this.originalData = structuredClone(this.employeeData);
      //  this.originalData = JSON.parse(JSON.stringify(this.selectedEmployee));
  }

  nextStep(){
   if(this.currentStep < this.totalSteps){
    this.currentStep++
    this.originalData = structuredClone(this.employeeData);
    //  this.selectedEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
  }

}


prevStep() {
  if (this.currentStep > 1) {
    this.currentStep--;
    // this.selectedEmployee = JSON.parse(JSON.stringify(this.originalData))
     this.employeeData = structuredClone(this.originalData);
  }
  
}

cancelEdit() {
  this.isEditOpen = false;
  this.currentStep = 1;
}

goBack(){
  this.router.navigate(['/page1'])
}


 openMobileMenu(){
  this.isMobileOpen = !this.isMobileOpen
 }
 closeMobileMenu() {
  this.isMobileOpen = false;
}

  onSubmit(form: NgForm) {
  if (!this.employeeData.qrId) {
    this.employeeData.qrId = Date.now().toString(); 
  }

  console.log('payload', this.employeeData);

  this.employeeService.createUser(this.employeeData).subscribe({
    next: (res) => {
      console.log('response', res.message);
      this.form.resetForm(new CreateStaffModel());
    },
    error: (err) => {
      console.log('Error', err.message);
    }
  });
}


}
