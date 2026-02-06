import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';
import { PaginationRequest } from '../app/model/notificationModel';


@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

    private apiUrl = '/api/notifications'; // Replace with your real endpoint

  constructor(private http: HttpClient) {}

  getNotifications(item: PaginationRequest): Observable<any> {
    let url = (`${environment.baseUrl}/notification`);
    let isFirstParam = true

    if(item.filter){
      url += `${isFirstParam ? '?' : '&'}filter=${item.filter}`
      isFirstParam = false
    }

    return this.http.get(url)
  }


  markNotificationAsRead(payload: { notificationId: string }) {
  return this.http.post(
    `${environment.baseUrl}/notifications/mark-read`,
    payload
  );
}

}
