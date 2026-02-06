
export interface Root {
  resp: EnrolMerchantModel
}

export class EnrolMerchant2Model {
  cardNo!: string
  name!: string
  email!: ['']
  lowerTreshold!: string
  balance!: string
  frequency!: string
  timestampWorth!: string
  status!: string
  isFundgateMerchantUpdated!: boolean
  _id?: string
  createdAt!: string
  updatedAt!: string
  __v!: number
}



export class EnrolMerchantModel {
  cardNo!: string
  name!: string
  email!: string
  frequency!: string
  lowerTreshold!: string
  timestampWorth!: string
}