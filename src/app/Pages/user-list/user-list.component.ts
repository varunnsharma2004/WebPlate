import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AppService } from '../../Service/app.service';
import { DataService } from '../../Service/data.service';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AutoComplete } from 'primeng/autocomplete';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import Swal from 'sweetalert2'
import { CreateUserComponent } from '../create-user/create-user.component';
import { DialogService } from 'primeng/dynamicdialog';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [Message,FormsModule,FloatLabel,AutoComplete, TableModule, CommonModule, ButtonModule, ProgressSpinner],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  items: any= ['varun', 'karna', 'tarun'];
  userData: any = [];
  user:any='' 
  constructor( 
    public data: DataService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService ,
     public dialogService: DialogService) {
    this.data.FatchData();
    this.data.seedData.subscribe((rs) => {
      console.log(rs, 'sdfasdf')
      this.items = rs;
      

    })
  }
  deleteUser(username: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
      this.data.deleteUser(username); 
      
      }
     
    });
  }
  getUserName()
  {
   let dd= this.data.GetUserByUname(this.user);
    
  // console.log(this.data.seedData.value)
  }

  UpdateUser(Userdata:any)
  {
    this.data.isModal=true
    const dialogRef =this.dialogService.open(CreateUserComponent, {
      header: 'Update User',
      width: '450px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closable: true,
      data:{
        type:"update",
        Userdata:Userdata
      }
  });
  dialogRef.onClose.subscribe(() => {
    this.data.isModal=false;
  });
  }
  
}
