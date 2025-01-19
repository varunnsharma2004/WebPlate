import { Component } from '@angular/core';
 
import { ButtonModule } from 'primeng/button';
 
import { AutoComplete } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from "../user-list/user-list.component"; 
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DataService } from '../../Service/data.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  ButtonModule,  AutoComplete, CommonModule, FormsModule, UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  items: any[] = ['varun','karna','tarun'];

  value: any;

constructor(public dialogService: DialogService ,public data:DataService){
console.log(data.isLoading)
}
  search(event:any) {
 
    this.items = ['varun', 'karna', 'tarun'].filter(item =>
      item.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  addNewUser()
  {
    this.data.isModal=true
    const dialogRef =this.dialogService.open(CreateUserComponent, {
      header: 'Create New User',
      width: '450px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closable: true
  });
  dialogRef.onClose.subscribe(() => {
    this.data.isModal=false
  });
  }
}
