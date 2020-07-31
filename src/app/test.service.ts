import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TestService {
  apiURL = "http://127.0.0.1:3000";

  constructor(private http:HttpClient,) { }
  // getData(){
  //   return this.http.get("api/get-all-user").subscribe()
  // }

  getAllUser():Observable<any>{
    return this.http.get(this.apiURL + "/api/get-all-user");
  }


  addUser(objdata: any){
    return this.http.post(this.apiURL +"/api/add-user", objdata).subscribe((res) => {
      console.log(res);
    })
  }

  deleteUserbyId(userId:String){
  
    this.http.delete(this.apiURL + "/api/delete-user"+"/"+ userId).subscribe(data => {
      console.log(data);
    });
  }

  updateUserbyId(editedData:any , editedUserID:String ){
    this.http.put(this.apiURL + "/api/edit-user" + "/"+ editedUserID , editedData).subscribe(data => {
      console.log(data);
    })
  }
}

