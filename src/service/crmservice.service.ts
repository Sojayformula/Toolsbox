import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRMEnvironment, environment } from '../app/environment/environment';
import { creatPlaceHolderModel, PlaceholderModel } from '../app/model/crmcreateplaceholder-model';
import { CreateTcketModel, TicketModel, ticketSearchModel } from '../app/model/crmManageTickets';
import { PaginationModel } from '../app/model/placeholder';
import { TicketMetricsModel } from '../app/model/crmMetrics';
import { addContactModel, ContactImportModel } from '../app/model/crmcontactImport';
import { EnrolMerchantModel } from '../app/model/EnrolMerchantModel';
import { CreateMerchantModel, EditModel, ToolsModel } from '../app/model/crmtools';


@Injectable({
  providedIn: 'root'
})
export class CRMserviceService {

  constructor(private http: HttpClient) { }

     getNotification():Observable<any>{
    return this.http.get(`${CRMEnvironment.crmbaseUrl}/notification`)
  }

    markNotificationAsRead(payload: { notificationId: string }): Observable<any> {
  return this.http.patch(`${CRMEnvironment.crmbaseUrl}/notification/mark-all-read`, payload);
}

// Create placeholder
getCreateplaceHolder(payload: creatPlaceHolderModel):Observable<any>{
  return this.http.post(`${environment.baseUrl}/placeholder/create`, payload)
}
// CRMEnvironment.crmbaseUrl

// Post contact
getContactImport(payload: creatPlaceHolderModel):Observable<any>{
  return this.http.post(`${CRMEnvironment.crmbaseUrl}/contacts`, payload)
}

// Get Contact
getContact():Observable<any>{
  return this.http.get(`${environment.baseUrl}/contacts`)
}

//     getContPatch(id: string): Observable<any> {
//   return this.http.patch(`${CRMEnvironment.crmbaseUrl}/contacts${id}`);
// }

// /list-tickets
getTicket(item: ticketSearchModel):Observable<any>{
  let url = `${environment.baseUrl}/ticket/list-tickets`
  let isFirstParam = true

   if(item.search){
    url += `${isFirstParam ? '?' : '&'}search=${item.search.toString()}`
    isFirstParam = false
  }

   if(item.priority){
    url += `${isFirstParam ? '?' : '&'}priority=${item.priority.toString()}`
    isFirstParam = false
  }

    if(item.status){
    url += `${isFirstParam ? '?' : '&'}status=${item.status.toString()}`
    isFirstParam = false
  }

     if(item.startDate){
    url += `${isFirstParam ? '?' : '&'}startDate=${item.startDate.toString()}`
    isFirstParam = false
  }

       if(item.endDate){
    url += `${isFirstParam ? '?' : '&'}endDate=${item.endDate.toString()}`
    isFirstParam = false
  }

  if(item.page){
    url += `${isFirstParam ? '?' : '&'}page=${item.page.toString()}`
    isFirstParam = false
  }

  if(item.pageSize){
    url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize.toString()}`
  }

  return this.http.get(url)
}



// Placeholde
placeHolder(item: PaginationModel):Observable<any>{
  let url = `${environment.baseUrl}/placeholder/list`
  let isFirstParam = true

  if(item.page){
    url += `${isFirstParam ? '?' : '&'}page=${item.page.toString()}`
    isFirstParam = false
  }

  if(item.pageSize){
    url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize.toString()}`
  }

  return this.http.get(url)
}



// create ticket
getCreateTicket(payload: CreateTcketModel):Observable<any>{
  return this.http.post(`${environment.baseUrl}/ticket/create-ticket`, payload)
}


deleteUserTicket(Id: string):Observable<any>{
  // return this.http.delete(`${environment.baseUrl}/ticket/delete/${Id}`)
  return this.http.delete(`${CRMEnvironment.crmbaseUrl}/fundgate-merchant/delete-merchant/${Id}`)
}


 getMetrics(): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${environment.baseUrl}/metrics?duration=ALL`, { headers });
  }


  // Dashboard metrics
    // getMetrics2(): Observable<any> {
    //    return this.http.get(`${environment.baseUrl}/metrics`)
    //   }

        getMetrics2(duration: string): Observable<any> {
    return this.http.get( `${environment.baseUrl}/metrics?duration=${duration}`);
  }


  // Contact patch
  getContactPatch(id: string, payload: ContactImportModel):Observable<any>{
    return this.http.patch(`${environment.baseUrl}/contacts/${id}`, payload)
  }

    // Contact delete
  getContactDelete(id: string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/placeholder/delete/${id}`)
  }

   // Contact post
  getContactPost(payload: addContactModel):Observable<any>{
    return this.http.post(`${environment.baseUrl}/contacts`, payload)
  }


  // create merchant
getCreateMerchant(payload: EnrolMerchantModel):Observable<any>{
  return this.http.post(`${CRMEnvironment.crmbaseUrl}/create-merchant`, payload)
}


 // Placeholder patch
  getPlaceholderPatch(id: string, payload: PlaceholderModel):Observable<any>{
    return this.http.patch(`${environment.baseUrl}/placeholder/update/${id}`, payload)
  }

  // Placeholder delete
  getPlaceholderDelete(id: string, payload: PlaceholderModel):Observable<any>{
    return this.http.patch(`${environment.baseUrl}/placeholder/delete/${id}`, payload)
  }



  // Tools get
gettools():Observable<any>{
  return this.http.get(`${CRMEnvironment.crmbaseUrl}/fundgate-merchant/all-merchant`) 
}

  // Tools post
gettoolsPost(payload: ToolsModel):Observable<any>{
  console.log('Give me tools',payload)
  return this.http.post(`${CRMEnvironment.crmbaseUrl}/fundgate-merchant/create-merchant`, payload) 
}

  // Tools patch
gettoolsEdit(id: string, payload: EditModel):Observable<any>{
  return this.http.patch(`${CRMEnvironment.crmbaseUrl}/fundgate-merchant/update-merchant/${id}`, payload) 
}


  }





// afuaannorwa@gmail.com
//   Defaultpassword@1 
