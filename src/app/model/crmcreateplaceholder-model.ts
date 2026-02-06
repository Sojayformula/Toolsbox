
// create placeholder
export class creatPlaceHolderModel {
  label!: string
  type!: string
  options!: string[]
  textValue!: string 
}


// edit placeholder
export interface Root {
  success: boolean
  message: string
  data: PlaceholderModel
}

// export class PlaceholderModel {
//   _id?: string
//   label!: string
//   type!: string
//   options!: ''
//   textValue!: string
//   organizationId!: string
//   createdBy!: string
//   createdAt!: string
//   updatedAt!: string
//   __v!: number
// }

export class PlaceholderModel {
  label!: string
  type!: string
  options!: string[]
  textValue!: string

}


// UI model (for form input)
export interface PlaceholderUiModel {
  label: string;
  type: 'TEXT' | 'DROPDOWN';
  options: string; // comma-separated string for input
  textValue: string;
}

