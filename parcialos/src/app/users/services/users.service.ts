import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { catchError, retry } from 'rxjs/operators';
import { isNgContainer } from '@angular/compiler';
import { AnyKindOfDictionary } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //Students Endpoint
  basePath = "http://localhost:3000/api/v1/users";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  //API Error Handling
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //Default error Handling
      console.log(`An error ocurred: ${error.error.message}`);
    } else{
      //Unsuccessful response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, bady was: ${error.error}`
      );
    }
    //Return Observable with Error Messafe to Client
    return throwError('Something happened with request, please try again later');
  }

  //Create Student
  create(item:User): Observable<User>{
    return this.http.post<User>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError));
  }

  //Get Student By Id
  getById(id: any): Observable<User>{
    return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError));
    //http://localhost:3000/api/v1/users/4
    //basePath = http://localhost:3000/api/v1/users
    //id = 4
  }
  //Get All Students
  getAll(): Observable<any>{
    return this.http.get<any>(this.basePath, this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError));
  }
/*
  getForLogin(name:string, password:string): Observable<User>{
    return this.http.get<any>(this.basePath,this.httpOptions).subscribe(res=>{
      const user = res.find((a:any))
    })
  }
*/
  //Update Student
  update(id: any, item:any): Observable<User>{
    return this.http.put<User>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError));
  }
  
  //Delete Students
  delete(id:any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError));
  }
}