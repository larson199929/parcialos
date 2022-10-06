import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

//Students Endpoint
basePath = 'http://localhost:3000/api/v1/users';

httpOptions = {
headers: new HttpHeaders({
  'Content-type': 'application/json',
})
}

  constructor(private http: HttpClient) { }

//API Error Handling
handleError(error: HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    //Default error handling
    console.log(`An error ocurred: ${error.error.message}`);
  }else{
    //Unsuccessful response Error Code returned from Backend
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  }
  //Return Observable with Error Message to Client
  return throwError('Something happend with request, please try again later');
}

getAll(): Observable<User>{
  return this.http.get<User>(this.basePath, this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));
}

//Get user By Id
getById(id:number): Observable<User>{
  return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));
}

  //Update user
  update(id:number, item:any): Observable<User>{
    return this.http.put<User>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }


}
