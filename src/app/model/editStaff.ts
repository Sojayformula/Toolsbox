export interface editStaffModel {
  profilePicture: string
  firstName: string
  lastName: string
  otherName: string
  qrId: string
  email: string
  dateOfBirth: string
  nationality: string
  gender: string
  idType: string
  phoneNumber: string
  idNumber: string
  maritalStatus: string
  jobTitle: string
  unit: string[]
  employmentType: string
  hireDate: string
  workLocation: string
  staffId: string
  supervisor: string[]
  role: string
  emergencyContactFullName: string
  emergencyContactRelationship: string
  emergencyContactPhoneNumber: string
  emergencyContactEmail: string
  emergencyContactCurrentAddress: string
  spouseName: string
  spousePhone: string
  spouseEmail: string
  marriageCertificateUrl: string
  numberOfChildren: number
  children: Children[]
  educationDetails: EducationDetail[]
  customShiftStartTime: string
  customShiftEndTime: string
  nextOfKinFullName: string
  nextOfKinRelationship: string
  nextOfKinPhoneNumber: string
  nextOfKinEmail: string
  nextOfKinCurrentAddress: string
}

export interface Children {
  fullName: string
  dob: string
  birthCertificateUrl: string
}

export interface EducationDetail {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  certificateUrl: string
}
