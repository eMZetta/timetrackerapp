import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeTracking } from './time-tracking.model';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private apiUrl = 'http://localhost:5000/api/TimeTracking';
  constructor(private http: HttpClient) { }

  getAll(): Observable<TimeTracking[]> {
    return this.http.get<TimeTracking[]>(this.apiUrl);
  }

  post(timeTracking: TimeTracking): Observable<TimeTracking> {
    return this.http.post<TimeTracking>(this.apiUrl, timeTracking);
  }

  put(id: number, timeTracking: TimeTracking): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, timeTracking);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
