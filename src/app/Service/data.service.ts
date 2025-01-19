import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
userData:any=[];
isLoading:boolean=false;
isModal:boolean=false;
seedData:BehaviorSubject<any>=new BehaviorSubject(null)
  constructor(private appService:AppService,
    private messageService: MessageService) { 

  }
  FatchData()
  {
     
    this.appService.getData().subscribe((data:any)=>{ 
      console.log(data,"data")
      if(data.msg=="ok"){
        this.userData=data.users
        this.seedData.next(this.userData);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Data fetched successfully!'
        });
      }
    })

  }

CreateNewUser(data:any){
  this.isLoading=true;
this.appService.CreateUser(data).subscribe((data:any)=>{
  this.isLoading=false;
  if(data.msg=="ok"){
    this.userData.push(data.user);
    this.seedData.next(this.userData);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New User Created Successfully!',
          life: 3000
        });
        console.log( data);   
  }
  else{
    this.messageService.add({
      severity: 'error',
      summary: 'Somthing Wrong',
      detail: data.msg,
      life: 3000
    });
  }
})
}

GetUserByUname(username: string) {
  this.appService.getUserByUserName(username).subscribe((data: any) => {
    console.log(data); 
    if (data.msg === 'ok') {
      const userArray = Array.isArray(data.user) ? data.user : [data.user];
      this.seedData.next(userArray);
    } else {
      this.FatchData()
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User Not Found!',
        life: 3000,
      });
    }
  });
}

deleteUser(userName:string)
{
  this.appService.DeleteUser(userName).subscribe((data:any)=>{
    if(data.msg=='ok')

    { 
      this.userData = this.userData.filter((user:any) => user.username !== userName);
      this.seedData.next(this.userData);

      console.log(this.userData,'deleer');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User Deleted !',
        life: 3000
      });
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:  data.msg,
        life: 3000
      });
    }
  })

}
UpdateUser(username:string,data:any)
{ this.isLoading=true;
  this.appService.UpdateUserData(username,data).subscribe((data:any)=>{
    this.isLoading=false;
    if(data.msg=='ok'){
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User Updated !',
        life: 3000
      });
    }
  })
}
}
