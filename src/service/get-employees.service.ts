import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../app/environment/environment';
import { HttpClient } from '@angular/common/http';
import { CreateStaffModel, EducationModel, employeesModel, searchQueryModel } from '../app/model/model';
import { CreateUnitPayload, SearchQueryModel, UnitHeadModel } from '../app/model/unit';
import { UserRole } from '../app/model/userRowModel';
import { editStaffModel } from '../app/model/editStaff';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeesService {

  constructor(private http: HttpClient) { }


  getaLLEmployees(item: searchQueryModel):Observable<any>{
    let Url = `${environment.baseUrl}/staff/all-staffs`
    let isFirstParam = true

    if(item.search ){
      Url += `${isFirstParam ? '?' : '&'}search=${item.search}`
      isFirstParam = false
    }

        if(item.page ){
      Url += `${isFirstParam ? '?' : '&'}page=${item.page}`
      isFirstParam = false
    }

         if(item.pageSize ){
      Url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`
      isFirstParam = false
      
    }

      if(item.staffStatus ){
      Url += `${isFirstParam ? '?' : '&'}staffStatus=${item.staffStatus}`
      isFirstParam = false
     
    }

      if(item.gender){
      Url += `${isFirstParam ? '?' : '&'}gender=${item.gender}`
      isFirstParam = false
     
    }

    return this.http.get(Url)
  }


  getUnit(item: SearchQueryModel):Observable<any>{
    let url = (`${environment.baseUrl}/unit/get-units`)
    let isFirstParam = true

     if(item.pageSize){
      url += `${isFirstParam ? '?': '&'}pageSize=${item.pageSize}`
       isFirstParam = false
    }

    if(item.search){
      url += `${isFirstParam ? '?': '&'}search=${item.search}`
      isFirstParam = false
    }

    if(item.page){
      url += `${isFirstParam ? '?': '&'}page=${item.page}`
       isFirstParam = false
    }

    return this.http.get(url)
  }


  getEmployee(id: string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/staff/${id}`)
  }

   getLoggedInUserProfile(): Observable<any> {
     const userId = localStorage.getItem('userId');
    return this.http.get(`${environment.baseUrl}/staff/${userId}`);
  }
  
  
  createUser(payload: CreateStaffModel):Observable<any>{
    return this.http.post(`${environment.baseUrl}/staff/create-staff`, payload)
  }

  // Edit staff
      editUser( Id: string, payload: editStaffModel): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/staff/${Id}`, payload);
  }

  // create unit service
   createUnit(payload: CreateUnitPayload):Observable<any>{
    return this.http.post(`${environment.baseUrl}/unit/create-unit`, payload)
  }

   // delete unit service
   deleteUnit(id: string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/unit/delete-unit/${id}`)
  }

  // Edit unit
    editUnit(id: string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}unit/update-unit/${id}`)
  }

    submitEducation(staffId: string, education: EducationModel[]): Observable<any> {
    const payload = { staffId, educationDetails: education };
    return this.http.post(`${environment.baseUrl}/staff/create-staff${staffId}`, payload);
  }

  // To change user role
  assignRole(userId: string, role: UserRole) {
  return this.http.put(`/api/users/${userId}/role`, { role });
}

}
