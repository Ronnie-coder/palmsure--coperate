import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // This points to the Vercel function we made in Step 3
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) {}

  sendContactForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      type: 'contact',
      data: formData
    });
  }

  sendQuoteRequest(insuranceType: string, personalDetails: any, specificDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      type: 'quote',
      data: {
        type: insuranceType,
        personal: personalDetails,
        details: specificDetails
      }
    });
  }
}
