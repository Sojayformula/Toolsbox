export interface Root {
  message: string
  data: Data
//   pagination: PaginationQueryModel
}

export interface Data {
  "January 15, 2026": January152026[]
  "January 14, 2026": January142026[]
  "January 13, 2026": January132026[]
  "October 27, 2025": October272025[]
  "October 24, 2025": October242025[]
  "October 23, 2025": October232025[]
  "October 13, 2025": October132025[]
}

export interface January152026 {
  _id: string
  recipientId: string
  ticketId: TicketId
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TicketId {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  createdBy: CreatedBy
  assignedUser: AssignedUser
  ref: string
}

export interface CreatedBy {
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

export interface January142026 {
  _id: string
  recipientId: string
  ticketId: TicketId2
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TicketId2 {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  createdBy: CreatedBy2
  assignedUser: AssignedUser2
  ref: string
}

export interface CreatedBy2 {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface AssignedUser2 {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface January132026 {
  _id: string
  recipientId: string
  ticketId: TicketId3
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TicketId3 {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  createdBy: CreatedBy3
  assignedUser: AssignedUser3
  ref: string
}

export interface CreatedBy3 {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface AssignedUser3 {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface October272025 {
  _id: string
  recipientId: string
  ticketId: any
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface October242025 {
  _id: string
  recipientId: string
  ticketId: any
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface October232025 {
  _id: string
  recipientId: string
  ticketId: any
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface October132025 {
  _id: string
  recipientId: string
  ticketId: any
  title: string
  message: string
  referenceId: string
  referenceType: string
  notificationType: string
  isRead: boolean
  link: string
  createdAt: string
  updatedAt: string
  __v: number
}

// export interface PaginationQueryModel {
//   filter?: string;
//   total: number
//   page: number
//   pageSize: number
//   totalPages: number
// }


export class PaginationRequest {
  filter?: string;
  page!: number;
  pageSize!: number;
}

export interface PaginationResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

