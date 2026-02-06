
export class ticketSearchModel{
    statu?: string
    search?: string
    priority?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    pageSize?: number
}


// export interface TicketRoot {
//   tickets: Ticket[]
//   pagination: Pagination
// }


export interface TicketModel {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  source: string
  comments: any[]
  createdBy?: CreatedBy
  updatedBy: any
  threadMessageIds: string[]
  taggedUsers: TaggedUser[]
  taggedExternalContacts?: string[]
  assignedUser?: AssignedUser
  unwatchedUserIds: any[]
  urls: string[]
  placeholders: Placeholders
  ref: string
  emailThread: EmailThread[]
  createdAt: string
  updatedAt: string
  __v: number
  createdByEmail?: string
  originalMessageId?: string
  conversationId?: string
}

export interface CreatedBy {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface TaggedUser {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface AssignedUser {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface Placeholders {
  Institution?: string
  "Phone Number"?: string
  "Customer Type"?: string
  "Issue Channel"?: string
}

export interface EmailThread {
  from: string
  to: string[]
  cc: string[]
  body: string
  date: string
  messageId: string
  inReplyTo: any
  attachments: Attachment[]
  _id: string
}

export interface Attachment {
  id: string
  name: string
  contentType: string
  size: number
  url: string
  isInline: boolean
  _id: string
}

export interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}


// Create ticket model
export class CreateTcketModel {
  priority!: string
  status!: string
  taggedUsers!: string[]
  assignedUser!: string
  urls!: string[]
  placeholders!: Placeholders
  subject!: string
  description!: string
}

export interface Placeholders {
  Institution?: string
  "Phone Number"?: string
  "Customer Type"?: string
  "Issue Channel"?: string
}


