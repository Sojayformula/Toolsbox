export interface Root {
  status: Status
  data: Data
}

export interface Status {
  success: boolean
  message: string
  timestamp: string
}

export interface Data {
  total: number
  page: number
  pageSize: number
  contacts: ContactImportModel[]
}

export class ContactImportModel {
  _id?: string
  email!: string
  name!: string
  phone!: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}


// post request model
export class addContactModel {
  email!: string
  name!: string
  phone!: string
}

