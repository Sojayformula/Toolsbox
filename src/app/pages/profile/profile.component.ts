import { Component } from '@angular/core';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { employeesModel, searchQueryModel } from '../../model/model';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


    staffId: any = {}
    // selectedEmployee: any = {}
    selectedEmployee: any = {  
      firstName: '',
        phoneNumber: '',
        dateOfBirth: '',
  
          staffId: '',
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

  
      dob: string = '';
  
   
  
  
      constructor(private getEmployeesserv: GetEmployeesService, private employeeService: GetEmployeesService,
        private router: Router, private authService: AuthService){
    
        this.searchModel = new searchQueryModel()
        this.employeesModelData = new employeesModel()
      }
  
  
    ngOnInit(){

    //    if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    //   return;
    // }

      this.fetchEmployees();

      this.selectedEmployee.hireDate =
    this.selectedEmployee.hireDate?.split('T')[0];
    
    }
    
     
    
  
  
      // openEdit(){
      //   this.isEditOpen = true
      // }
  
      // resetEditForm(){
      //   this.isEditOpen = true
      // }


fetchEmployees() {
  const userId = localStorage.getItem('userId');
  console.log('Profile user id', userId);

  if (!userId) {
    console.error('User ID missing');
    return;
  }

  this.getEmployeesserv.getLoggedInUserProfile().subscribe({
    next: (res) => {
      console.log('Employee API response', res);

      // //  GUARDED assignment
      // if (!res || !res._id) {
      //   console.error('Invalid employee response');
      //   return;
      // }

      this.selectedEmployee = res;
      console.log('Employee assigned', this.selectedEmployee);
    },
    error: (err) => console.error(err)
  });
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
  
  
  openEdit() {
    this.isEditOpen = true;
      // Deep copy using JSON
    this.originalEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
    // this.selectedEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
    // this.currentStep = 1;
  }
  
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }
  
  cancelEdit() {
    this.selectedEmployee = JSON.parse(JSON.stringify(this.originalEmployee));
  }
  
  // prevStep() {
  //   if (this.currentStep > 1) {
  //     this.currentStep--;
  //   }
  // }
  
  save() {
    // save logic here
    this.isEditOpen = false;
  }
  
  setStep(step: number) {
    this.currentStep = step;
  }
  
  goBack(){
    this.router.navigate(['/page1'])
  }
  
  
  addMore(){
    console.log('Before:', this.selectedEmployee.children);
    this.selectedEmployee.children.push({firstName: '', dod: ''})
  }
  
  removeChild(index: number){
    this.selectedEmployee.children.splice(index, 1)
  }

}
