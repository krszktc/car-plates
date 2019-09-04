import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Plate } from 'src/models/plate';

@Injectable()
export class DataService {

  private readonly REQUEST_HEADER = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.REQUEST_HEADER.append('Accept', 'application/json');
    this.REQUEST_HEADER.append('Content-Type', 'application/json');
  }

  getAllPlates(url: string): Observable<Object> {
    const params = url ? url : '';
    return this.http.get<Object>('/api/plates' + params);
  }

  removePlate(plateId: string): Observable<any> {
    return this.http.get<any>('/api/delete/' + plateId);
  }

  addPlate(plate: Plate): Observable<any> {
    return this.http.post<any>('/api/add', plate.forRequest, {headers: this.REQUEST_HEADER});
  }

  updatePlate(plate: Plate): Observable<any> {
    return this.http.put<any>('/api/update', plate.forRequest, {headers: this.REQUEST_HEADER});
  }

}
