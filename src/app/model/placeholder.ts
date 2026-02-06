//   MANAGE TICKET TABLE MODEL //
export class tableDataModel {
  search!: string
  status!: string
  priority!: string
  startDate!: string
  endDate!: string
  page!: number
  pageSize!: number
}

export interface Daum {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  organizationId: string
  source: string
  comments: Comment[]
  unitId: string
  createdBy: CreatedBy
  threadMessageIds: any[]
  taggedUsers: TaggedUser[]
  unwatchedUserIds: string[]
  docUrls: any[]
  placeholders: Placeholders
  ref: string
  emailThread: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Comment {
  _id: string
  ticketId: string
  comment: string
  createdBy: string
  organizationId: string
  parentCommentId: any
  replies: string[]
  createdAt: string
  updatedAt: string
  __v: number
  createdByName?: string
}

export interface CreatedBy {
  _id: string
  firstName: string
  lastName: string
  email: string
  profileUrl: any
}

export interface TaggedUser {
  _id: string
  firstName: string
  lastName: string
  email?: string
  profileUrl: any
}

export interface Placeholders {}

export class PaginationModel {
  total!: number
  page!: number
  pageSize!: number
  totalPages!: number
}



// models/notification model
export interface AppNotification {
  _id: string;
  recipientId: string;
  title: string;
  message: string;
  referenceId: string;
  referenceType: string;
  notificationType: string;
  isRead: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
  sender: any;
  notificationId: string;
}

    // CREATE PLACEHOLDER //
  export class createPlaceHolModel {
  label!: string;
  type!: string;
  options!: string[]
  textValue!: string
}

// PATCH PLACEHOLDER NOTIFICATION //
export class markAsReadModel {
  success!: boolean
  message!: string
   notificationId!: string;
     
}