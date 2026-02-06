


//  All Employees Model
export interface EmployeesResponse {
  message: string
  // data: Daum[]
  pagination: Pagination
}

export class employeesModel {
  _id!: string
  lastName!: string
  email!: string
  unit!: Unit
  staffId!: string
  numberOfChildren!: number
  faceEmbedding!: any[]
  password!: string
  isFirstLogin!: boolean
  customShiftStartTime?: string
  qrId?: string
  customShiftEndTime?: string
  isOrganizationalHead!: boolean
  isUnitHead!: boolean
  role!: string
  organization!: string
  // children!: Children[]
  educationDetails!: EducationDetail[]
  createdAt!: string
  updatedAt!: string
  __v!: number
  qrCode!: string
  gender!: string
  isProfileComplete!: boolean
  maritalStatus!: string
  nationality!: string
  otherName!: string
  employmentType!: string
  jobTitle!: string
  workLocation!: string
  dateOfBirth!: string
  idType!: string
  supervisor?: Supervisor
  refreshToken?: string
  phoneNumber?: string
  emergencyContactCurrentAddress?: string
  emergencyContactEmail?: string
  emergencyContactFullName?: string
  emergencyContactPhoneNumber?: string
  emergencyContactRelationship?: string
  idNumber?: string
  nextOfKinCurrentAddress?: string
  nextOfKinEmail?: string
  nextOfKinFullName?: string
  nextOfKinPhoneNumber?: string
  nextOfKinRelationship?: string
  profilePicture?: string
  spouseEmail?: string
  spouseName?: string
  spousePhone?: string
  hireDate?: string
  employmentStatus?: string
}

export interface Unit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: any
  createdAt: string
  updatedAt: string
  __v: number
}

// export interface Children {
//   fullName: string
//   dob: string
//   _id: string
// }

export interface EducationDetail {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  _id: string
}

export interface Supervisor {
  _id: string
  profilePicture: string
  firstName: string
  lastName: string
  otherName: string
  email: string
  dateOfBirth: string
  nationality: string
  gender: string
  idType: string
  phoneNumber: string
  idNumber: string
  maritalStatus: string
  employmentStatus?: string
  unit: string
  jobTitle: string
  employmentType: string
  hireDate: string
  workLocation: string
  supervisor?: string
  staffId: string
  spouseName: string
  spousePhone: string
  spouseEmail: string
  numberOfChildren: number
  // children: Children[]
  educationDetails: EducationDetail2[]
  nextOfKinFullName: string
  nextOfKinRelationship: string
  nextOfKinPhoneNumber: string
  nextOfKinEmail: string
  nextOfKinCurrentAddress: string
  emergencyContactFullName: string
  emergencyContactRelationship: string
  emergencyContactPhoneNumber: string
  emergencyContactEmail: string
  emergencyContactCurrentAddress: string
  faceEmbedding: any[]
  password: string
  isFirstLogin: boolean
  isOrganizationalHead: boolean
  isUnitHead: boolean
  role: string
  organization: string
  createdAt: string
  updatedAt: string
  __v: number
  qrCode: string
  refreshToken?: string
  isProfileComplete: boolean
  qrId?: string
}

// export interface Children {
//   fullName: string
//   dob: string
//   _id: string
// }

export interface EducationDetail2 {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  _id: string
}

export interface Pagination {
  total: number
  page: string
  pageSize: string
  totalPages: number
}



// search query
export class searchQueryModel {
 _id!: string
unit!: string
search!: string
page!: ''
pageSize!: string
gender?: string
maritalStatus!: string
employmentType!: string
workLocation!: string
staffStatus!: string
}



// //// create staff ////
export class CreateStaffModel {
  profilePicture!: string
  firstName!: string
  lastName!: string
  otherName!: string
  qrId!: string
  email!: string
  dateOfBirth!: string
  nationality!: string
  gender!: string
  idType!: string
  phoneNumber!: string
  idNumber!: string
  maritalStatus!: string
  jobTitle!: string
  unit!: string[]
  employmentType!: string
  hireDate!: string
  workLocation!: string
  staffId!: string
  supervisor!: string[]
  role!: string
  emergencyContactFullName!: string
  emergencyContactRelationship!: string
  emergencyContactPhoneNumber!: string
  emergencyContactEmail!: string
  emergencyContactCurrentAddress!: string
  spouseName!: string
  spousePhone!: string
  spouseEmail!: string
  marriageCertificateUrl!: string
  numberOfChildren!: number
  children!: Children[]
  // educationDetails!: EducationDetail[]
  educationDetails: EducationModel[] = [new EducationModel()];
  customShiftStartTime!: string
  customShiftEndTime!: string
  nextOfKinFullName!: string
  nextOfKinRelationship!: string
  nextOfKinPhoneNumber!: string
  nextOfKinEmail!: string
  nextOfKinCurrentAddress!: string
}

export interface Children {
  fullName: string
  dob: string
  birthCertificateUrl?: string
  
}

export class EducationModel {
  institutionName!: string
  courseOfStudy!: string
  startDate!: string
  endDate!: string
  certificateUrl!: string
}


// //// create staff ////
// export class eduModel {}




////// Unit Model ///////
// export interface Root {
//   success: boolean
//   message: string
//   data: Daum[]
//   pagination: Pagination
//   timestamp: string
// }

// export interface Daum {
//   _id: string
//   name: string
//   description: string
//   isSubUnit: boolean
//   unitHead?: UnitHead
//   organization: Organization
//   parentUnit?: ParentUnit
//   createdAt: string
//   updatedAt: string
//   __v: number
// }

// export interface UnitHead {
//   _id: string
//   profilePicture: string
//   firstName: string
//   lastName: string
//   otherName: string
//   email: string
//   dateOfBirth: string
//   nationality: string
//   gender: string
//   idType: string
//   phoneNumber: string
//   idNumber: string
//   maritalStatus: string
//   employmentStatus: string
//   unit: string
//   jobTitle: string
//   employmentType: string
//   hireDate: string
//   workLocation: string
//   supervisor: string
//   staffId: string
//   spouseName: string
//   spousePhone: string
//   spouseEmail: string
//   numberOfChildren: number
//   children: Children[]
//   educationDetails: EducationDetail[]
//   nextOfKinFullName: string
//   nextOfKinRelationship: string
//   nextOfKinPhoneNumber: string
//   nextOfKinEmail: string
//   nextOfKinCurrentAddress: string
//   emergencyContactFullName: string
//   emergencyContactRelationship: string
//   emergencyContactPhoneNumber: string
//   emergencyContactEmail: string
//   emergencyContactCurrentAddress: string
//   faceEmbedding: any[]
//   password: string
//   isFirstLogin: boolean
//   isOrganizationalHead: boolean
//   isUnitHead: boolean
//   role: string
//   organization: string
//   createdAt: string
//   updatedAt: string
//   __v: number
//   qrCode: string
//   refreshToken: string
//   isProfileComplete: boolean
// }

// export interface Children {
//   fullName: string
//   dob: string
//   _id: string
// }

// export interface EducationDetail {
//   institutionName: string
//   courseOfStudy: string
//   startDate: string
//   endDate: string
//   _id: string
// }

// export interface Organization {
//   _id: string
//   name: string
//   industry: string
//   location: string
//   email: string
//   phone: string
//   createdBy: string
//   isActive: boolean
//   createdAt: string
//   updatedAt: string
//   __v: number
// }

// export interface ParentUnit {
//   _id: string
//   name: string
//   description: string
//   isSubUnit: boolean
//   unitHead: string
//   organization: string
//   parentUnit: any
//   createdAt: string
//   updatedAt: string
//   __v: number
// }

// export interface Pagination {
//   total: number
//   page: string
//   pageSize: string
//   totalPages: number
// }




