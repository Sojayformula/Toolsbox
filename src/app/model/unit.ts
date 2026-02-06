////// Unit Model ///////
export class SearchQueryModel {
    search!: string;
    page!: number;
    pageSize!: number;
}


export interface Root {
  success: boolean
  message: string
  data: UnitHeadModel[]
  pagination: Pagination
  timestamp: string
}

export class UnitHeadModel {
  _id?: string
  name!: string
  description!: string
  isSubUnit!: boolean
  unitHead?: UnitHead
  organization!: Organization
  parentUnit?: ParentUnit
  createdAt!: string
  updatedAt!: string
  __v!: number
}

export class CreateUnitPayload {
  name!: string;
  description!: string;
  isSubUnit!: boolean;
  unitHead?: string;
  parentUnit?: string;
}


export interface UnitHead {
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
  employmentStatus: string
  unit: string
  jobTitle: string
  employmentType: string
  hireDate: string
  workLocation: string
  supervisor: string
  staffId: string
  spouseName: string
  spousePhone: string
  spouseEmail: string
  numberOfChildren: number
  children: Children[]
  educationDetails: EducationDetail[]
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
  refreshToken: string
  isProfileComplete: boolean
}

export interface Children {
  fullName: string
  dob: string
  _id: string
}

export interface EducationDetail {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  _id: string
}

export interface Organization {
  _id: string
  name: string
  industry: string
  location: string
  email: string
  phone: string
  createdBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ParentUnit {
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

export class Pagination {
  total!: number
  page!: string
  pageSize!: string
  totalPages!: number
}