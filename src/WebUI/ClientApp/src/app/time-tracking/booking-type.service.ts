import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookingType} from "../web-api-client";

@Injectable({
  providedIn: 'root'
})
export class BookingTypeService {
  private apiUrl = 'http://localhost:5000/api/BookingType';
  constructor(private http: HttpClient) { }

  getAll(): Observable<BookingType[]> {
    return this.http.get<BookingType[]>(this.apiUrl);
  }
}
