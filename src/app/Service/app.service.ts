import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    
      corsProxy = 'https://api.allorigins.win/raw?url=';
      apiUrl = 'https://rest.echoapi.com/';
  constructor(private http:HttpClient) {

   }

   getData=()=>{
    return this.http.get(`${this.corsProxy}${encodeURIComponent(this.apiUrl)}users`)
  }

  CreateUser= (data:any)=>{
 
    return this.http.post(`${this.corsProxy}${encodeURIComponent(this.apiUrl)}users`,data,{ headers: { 'Content-Type': 'application/json' }});
  }

  getUserByUserName=(userName:string)=>{
    return this.http.get(`${this.corsProxy}${encodeURIComponent(this.apiUrl)}users/${userName}`)
  }
   
  DeleteUser= (userName:string)=>{
    return this.http.delete(`${this.corsProxy}${encodeURIComponent(this.apiUrl)}users/${userName}`)
  }
  
  UpdateUserData = (username:string,userData:any)=>{
    return this.http.put(`${this.corsProxy}${encodeURIComponent(this.apiUrl)}users/${username}`,userData);
  }
}
