import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Setup } from 'src/app/models/setup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private setupUrl: string;

  constructor(
    private http: HttpClient,
    private globals: GlobalsService
  ) {
    this.setupUrl  = globals.server + 'api/setup';
  }

  /**.*/
  updateSetup(setup: Setup): Observable<Setup> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.post<Setup>(me.setupUrl, setup, httpOptions);
  }

  // Private methods -------------

   /**.*/
   private createHttpOptionsWithToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization-token': this.globals.getTokenFromLocalStorage()
      })
    };
  }
}
