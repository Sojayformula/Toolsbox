import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetEmployeesService } from '../../../service/get-employees.service';
import { Subject } from 'rxjs';
import { employeesModel, searchQueryModel } from '../../model/model';
import { Root } from '../../model/unit';
import { editStaffModel } from '../../model/editStaff';

@Component({
  selector: 'app-personal-information',
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit{

     staffId: any = {}
     selectedEmployee: any = { educationDetails: [] } 
  

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
    editMode = false
    isLoading = false
    imagePreview: string | ArrayBuffer | null = null;


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

               //  CONVERTED DATE //
get formattedDOB(): string {
  const date = this.selectedEmployee?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.selectedEmployee.supervisor.dateOfBirth = value;
}


       // IMGE PREVIEW //
isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname !== 'profile.jpg'; 
  } catch {
    return false;
  }
}

//  Edit  function
originalData: any = {};
onEditToggle() {
  this.isEditOpen = true;
  this.originalData = JSON.parse(JSON.stringify(this.selectedEmployee)); 
}

// Cancel function
onCancel(): void {
  this.isEditOpen = false;
  this.selectedEmployee = JSON.parse(JSON.stringify(this.originalData)); 
}

 getSafeProfilePicture(pic?: string): string {
  if (!pic) return '/assets/default-profile.png'; 
  return pic.replace(/^"|"$/g, '');
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




//  Mobile menu
 openMobileMenu(){
  this.isMobileOpen = !this.isMobileOpen
 }
 closeMobileMenu() {
  this.isMobileOpen = false;
}

// Open edit modal logic
// openEdit() {
//   this.isEditOpen = true;
//   this.originalEmployee = JSON.parse(JSON.stringify(this.selectedEmployee));
//   this.currentStep = 1;
// }

// // Cancel edit logic
// cancelEdit() {
//   this.selectedEmployee = JSON.parse(JSON.stringify(this.originalEmployee));
// }

// Next step logic
nextStep() {
  if (this.currentStep < this.totalSteps) {
    this.currentStep++;
  }
}

// prevStep() {
//   if (this.currentStep > 1) {
//     this.currentStep--;
//   }
// }

// save logic
save(form: NgForm) {

  // const payload: editStaffModel = {
  //   profilePicture: form.value.profilePicture,
  //   firstName: form.value.firstName,
  //   lastName: form.value.lastName,
  //   otherName: form.value.otherName,
  //   qrId: form.value.qrId,
  //   email: form.value.email,
  //   dateOfBirth: form.value.dateOfBirth,
  //   nationality: form.value.nationality,
  //   gender: form.value.gender,
  //   idType: form.value.idType,
  //   phoneNumber: form.value.phoneNumber,
  //   idNumber: form.value.idNumber,
  //   maritalStatus: form.value.maritalStatus,
  //   jobTitle: form.value.jobTitle,
  //   unit: form.value.unit, // array of strings
  //   employmentType: form.value.employmentType,
  //   hireDate: form.value.hireDate,
  //   workLocation: form.value.workLocation,
  //   staffId: form.value.staffId,
  //   supervisor: form.value.supervisor, // array of strings
  //   role: form.value.role,
  //   emergencyContactFullName: form.value.emergencyContactFullName,
  //   emergencyContactRelationship: form.value.emergencyContactRelationship,
  //   emergencyContactPhoneNumber: form.value.emergencyContactPhoneNumber,
  //   emergencyContactEmail: form.value.emergencyContactEmail,
  //   emergencyContactCurrentAddress: form.value.emergencyContactCurrentAddress,
  //   spouseName: form.value.spouseName,
  //   spousePhone: form.value.spousePhone,
  //   spouseEmail: form.value.spouseEmail,
  //   marriageCertificateUrl: form.value.marriageCertificateUrl,
  //   numberOfChildren: form.value.numberOfChildren,
  //   children: form.value.children?.map((child: any) => ({
  //     fullName: child.fullName,
  //     dob: child.dob,
  //     birthCertificateUrl: child.birthCertificateUrl
  //   })) || [], 
  //   educationDetails: form.value.educationDetails?.map((edu: any) => ({
  //     institutionName: edu.institutionName,
  //     courseOfStudy: edu.courseOfStudy,
  //     startDate: edu.startDate,
  //     endDate: edu.endDate,
  //     certificateUrl: edu.certificateUrl
  //   })) || [], 
  //   customShiftStartTime: form.value.customShiftStartTime,
  //   customShiftEndTime: form.value.customShiftEndTime,
  //   nextOfKinFullName: form.value.nextOfKinFullName,
  //   nextOfKinRelationship: form.value.nextOfKinRelationship,
  //   nextOfKinPhoneNumber: form.value.nextOfKinPhoneNumber,
  //   nextOfKinEmail: form.value.nextOfKinEmail,
  //   nextOfKinCurrentAddress: form.value.nextOfKinCurrentAddress
  // };
  const payload: editStaffModel = {
  ...form.value,
  children: form.value.children ?? [],
  educationDetails: form.value.educationDetails ?? []
};


  this.getEmployeesserv.editUser(this.staffId, payload).subscribe({
    next:(res)=>{
      console.log('Edit post request', res)
    
    },
    error:(err)=>{
      console.log('Failed to post', err)
    }
  })
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
