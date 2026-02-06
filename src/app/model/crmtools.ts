
export class EditModel {
  cardNo!: string
  name!: string
  email!: string
  lowerTreshold!: string
  frequency!: string
  timestampWorth!: string
}


export class CreateMerchantModel {
  cardNo!: string
  name!: string
  email!: string
  lowerTreshold!: string
  frequency!: string
  timestampWorth!: string
}




export interface Root {
  statusCode: number
  message: string
  response: ToolsModel[]
}

export class ToolsModel {
  _id?: string
  cardNo!: string
  name!: string
  email!: string
  lowerTreshold!: string
  higherTreshold?: string
  balance!: string
  frequency!: string
  timestampWorth!: string
  status!: string
  isFundgateMerchantUpdated!: boolean
  createdAt!: string
  updatedAt!: string
  __v!: number
  nextTimestamp?: string
  country?: string
  source?: string
  balanceUrl?: string
}